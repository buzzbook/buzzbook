import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useWindowWidth} from "@react-hook/window-size";
import {
	updateSelectedCourse,
	getSelectedCourse,
	getSavedCourses,
	removeCourse,
	saveCourse
} from "../../redux/courseListSlice";
import {Link} from "react-router-dom";
import Icon from "../../img/icon";
import {determineGradeLetter, determineGradeColor} from "../settings/StatsUtils";
import {SettingsContext} from "../settings/SettingsContext";

var cRating = {};
var pRating = {};
function CourseListItem(course, props) {

	const dispatch = useDispatch();
	const selectedCourse = useSelector(getSelectedCourse);
	const savedCourses = useSelector(getSavedCourses);
	const windowWidth = useWindowWidth();
	const {courselistSettings} = useContext(SettingsContext);
	const [ratingLoaded, updateRatingsLoaded] = useState(false);


	//course.courseID.split(" ").length !== 2 && console.log("nope")
	const [dept, num] = course.courseID.split(" ")
	//console.log(`http://localhost:4000/byCourse?dept=${dept}&num=${num}`)
	fetch(`http://localhost:4000/byCourse?dept=${dept}&num=${num}`)
		.then(resp => resp.json())
		.then(data => {
			//console.log(data)
			cRating[course.courseID] = data.courseEff
			pRating[course.courseID] = data.profEff
			//console.log(cRating[course.courseID], typeof cRating[course.courseID])
			updateRatingsLoaded(true);
		})

	let isSelected = selectedCourse === course.courseID;
	// let bgColor = isSelected ? "var(--shadingcolor)" : "initial";
	let bgColor = isSelected ? "var(--navcolor)" : "initial";
	let bshadow = isSelected ? "inset -1px 1px 4.5px var(--inputcolor), inset 1px -1px 4.5px var(--bgcolor)" : "initial";

	let isSaved = savedCourses[course.courseID];

	let enrollmentColor = "var(--green)";
	if (course.enrollmentPercent >= 100) enrollmentColor = "var(--crimson)";
	else if (course.enrollmentPercent > 67) enrollmentColor = "var(--red)";
	else if (course.enrollmentPercent > 33) enrollmentColor = "var(--orange)";

	const gradeColor = determineGradeColor(course.grade);
	const lettergrade = determineGradeLetter(course.grade);
	const cRatingColor = determineGradeColor((cRating[course.courseID]/5)*4)
	const pRatingColor = determineGradeColor((pRating[course.courseID]/5)*4)


	let displaygrade = lettergrade;
	if(courselistSettings[1] === 2){
		displaygrade = course.grade;
	}else if(courselistSettings[1] === 3){
		displaygrade = <>{lettergrade}, {course.grade}</>;
	}

	//console.log(rating, ratingColor)

	const listItem = (
		<div
			className={`p-2 rounded`}
			style={
				course.page === "catalog"
					? {backgroundColor: bgColor}
					: {backgroundColor: "initial"}
			}
			onClick={() => course.page === "catalog" && dispatch(updateSelectedCourse(course.courseID))}
		>
			<div className="position-relative">
				<div style={{maxWidth: "calc(100% - 25px)"}}>
					<div className="text-cutoff" style={{lineHeight: "1.25rem"}}>
						<h5 className="d-inline headingfont">
							{course.courseID}
						</h5>
						{windowWidth > 1630 ? <>&nbsp;&nbsp;</> : (<br/>)}
						<span className={"subheadingfont altheadingcolor"}>{course.name}</span>
					</div>

					<div className={"contentfont"} style={{letterSpacing: "-.01rem", lineHeight: "1rem"}}>
						<span style={{color: enrollmentColor}}>
							{Math.round(course.enrollmentPercent)}% {windowWidth > 1820 && `enrolled`}
						</span>
						<span className="altheadingcolor">
							<span style={{fontWeight: "900"}}>&nbsp;&#9632;&nbsp;</span>
							<span>
								{course.credits} credit{course.credits !== 1 && "s"}
							</span>
							{windowWidth > 1530 && (
								<>
									<span style={{fontWeight: "900"}}>&nbsp;&#9632;&nbsp;</span>
									<span>
										{course.numSections} section
										{course.numSections > 1 && "s"}
									</span>
								</>
							)}
							<br/>
						</span>
						{course.grade && (
							<>

								<span style={{color: gradeColor, fontWeight: "700"}}>{displaygrade}</span>
							</>
						)}
						{cRating[course.courseID] && (
							<>
								<span style={{fontWeight: "900"}} className="altheadingcolor">&nbsp;&#9632;&nbsp;</span>
								<span style={{color: cRatingColor, fontWeight: "700"}}>C: {cRating[course.courseID] && cRating[course.courseID].toFixed(2)}</span>
							</>
						)}
						{pRating[course.courseID] && (
							<>
								<span style={{fontWeight: "900"}} className="altheadingcolor">&nbsp;&#9632;&nbsp;</span>
								<span style={{color: pRatingColor, fontWeight: "700"}}>I: {pRating[course.courseID] && pRating[course.courseID].toFixed(2)}</span>
							</>
						)}
					</div>
				</div>

				<Icon
					name={isSaved? "unsave": "save"}
					alt={isSaved? "unsave course": "save course"}
					iconclass={isSaved? "unsaveIcon iconfilter": "saveIcon iconfilter"}
					onClick={isSaved? (
						() => dispatch(removeCourse(course.courseID))
					) : (
						() => dispatch(saveCourse(course.courseID))
					)}
				/>

			</div>
		</div>
	);

	if (course.page === "catalog") {
		return (
			<Link to={`/catalog/${course.courseID.replaceAll(" ", "+")}`} replace style={course.style}>
				{listItem}
			</Link>
		);
	}
	return <div style={course.style}>{listItem}</div>;
}

CourseListItem.propTypes = {
	courseID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	enrollmentPercent: PropTypes.number.isRequired,
	credits: PropTypes.number.isRequired,
	numSections: PropTypes.number.isRequired,
	grade: PropTypes.number
};

export default CourseListItem;
