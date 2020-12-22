import React from "react";
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

function CourseListItem(course) {

	const dispatch = useDispatch();
	const selectedCourse = useSelector(getSelectedCourse);
	const savedCourses = useSelector(getSavedCourses);
	const windowWidth = useWindowWidth();
	const sectionvisible = windowWidth > 1750 ? true : false;
	//const isdark = document.documentElement.classList.contains("dark-theme");

	let isSelected = selectedCourse === course.courseID;
	// let bgColor = isSelected ? "var(--shadingcolor)" : "initial";
	let bgColor = "initial";
	let bshadow = isSelected ? "inset -1px 1px 4.5px var(--inputcolor), inset 1px -1px 4.5px var(--bgcolor)" : "initial";

	let isSaved = savedCourses[course.courseID];

	let enrollmentColor = "var(--green)";
	if (course.enrollmentPercent >= 100) enrollmentColor = "var(--crimson)";
	else if (course.enrollmentPercent > 67) enrollmentColor = "var(--red)";
	else if (course.enrollmentPercent > 33) enrollmentColor = "var(--orange)";

	let gradeColor = "var(--green)";
	if (course.grade) {
		if (course.grade <= 1.5) gradeColor = "var(--red)";
		else if (course.grade <= 2.5) gradeColor = "var(--orange)";
		else if (course.grade <= 3.5) gradeColor = "var(--yellow)";
		else gradeColor = "var(--green)";
	}

	let grademap = {"A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3, "B-": 2.7, "C+": 2.3, "C": 2, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0}
	let delta = 4.01;
	var lettergrade;
	for (let letter in grademap) {
		if (Math.abs(grademap[letter] - course.grade) <= delta) {
			delta = Math.abs(grademap[letter] - course.grade);
			lettergrade = letter;
		}
	}

	const listItem = (
		<div
			className={`p-2 rounded`}
			style={
				course.page === "catalog"
					? {backgroundColor: bgColor, boxShadow: bshadow}
					: {backgroundColor: "initial", boxShadow: "initial"}
			}
			onClick={() => course.page === "catalog" && dispatch(updateSelectedCourse(course.courseID))}
		>
			<div className="position-relative">
				<div style={{maxWidth: "calc(100% - 25px)"}}>
					<div className="text-cutoff" style={{lineHeight: "1.25rem"}}>
						<h5 className="d-inline headingfont">
							{course.courseID}
						</h5>
						&nbsp;&nbsp;
						<span className={"subheadingfont altheadingcolor"}>{course.name}</span>
					</div>

					<div className={"contentfont altheadingcolor"} style={{letterSpacing: "-.01rem", lineHeight: "1rem"}}>
						<span style={{color: enrollmentColor}}>
							{Math.round(course.enrollmentPercent)}% enrolled
						</span>
						<span style={{fontWeight: "900"}}>&nbsp;&#9632;&nbsp;</span>
						<span>
							{course.credits} credit{course.credits !== 1 && "s"}
						</span>
						{sectionvisible && (
							<>
								<span style={{fontWeight: "900"}}>&nbsp;&#9632;&nbsp;</span>
								<span>
									{course.numSections} section
									{course.numSections > 1 && "s"}
								</span>
							</>
						)}
						{course.grade && (
							<>
								<span style={{fontWeight: "900"}}>&nbsp;&#9632;&nbsp;</span>
								<span style={{color: gradeColor, fontWeight: "700"}}>{lettergrade}</span>
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
	grade: PropTypes.string.isRequired
};

export default CourseListItem;
