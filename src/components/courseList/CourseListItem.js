import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
	updateSelectedCourse,
	getSelectedCourse,
	getSavedCourses,
	removeCourse,
	saveCourse
} from "../../redux/courseListSlice";
import {Link} from "react-router-dom";
import saveIcon from "../../img/saveIcon.png";
import unsaveIcon from "../../img/unsaveIcon.png";

function CourseListItem(course) {
	const dispatch = useDispatch();
	const selectedCourse = useSelector(getSelectedCourse);
	const savedCourses = useSelector(getSavedCourses);

	let isSelected = selectedCourse === course.courseID;
	let bgColor = course.page === "catalog" && isSelected ? "selected" : "";

	let isSaved = savedCourses[course.courseID];

	let enrollmentColor = "var(--green)";
	if (course.enrollmentPercent > 67) enrollmentColor = "var(--red)";
	else if (course.enrollmentPercent > 33) enrollmentColor = "var(--orange)";

	let gradeColor = "green";
	if (course.grade.charAt(0) === "B") gradeColor = "var(--yellow)";
	else if (course.grade.charAt(0) === "C") gradeColor = "var(--orange)";
	else if (course.grade.charAt(0) === "D") gradeColor = "var(--red)";

	const listItem = (
		<div
			className={`p-2 mb-2 rounded ${bgColor}`}
			onClick={() =>
				course.page === "catalog" &&
				dispatch(updateSelectedCourse(course.courseID))
			}
		>
			<div className="position-relative">
				<div style={{maxWidth: "calc(100% - 25px)"}}>
					<div className="text-cutoff">
						<h5 className="d-inline">
							<b>{course.courseID}</b>
						</h5>
						&nbsp;&nbsp;&nbsp;
						<span>{course.name}</span>
					</div>

					<div style={{fontSize: "0.9rem"}}>
						<span style={{color: enrollmentColor}}>
							{Math.round(course.enrollmentPercent)}% enrollment
						</span>
						<span style={{fontWeight: "900"}}>
							&nbsp;&bull;&nbsp;
						</span>
						<span>
							{course.credits} credit{course.credits !== 1 && "s"}
						</span>
						<span style={{fontWeight: "900"}}>
							&nbsp;&bull;&nbsp;
						</span>
						<span>
							{course.numSections} section
							{course.numSections > 1 && "s"}
						</span>
						<span style={{fontWeight: "900"}}>
							&nbsp;&bull;&nbsp;
						</span>
						<span style={{color: gradeColor}}>{course.grade}</span>
					</div>
				</div>

				{isSaved ? (
					<img
						src={unsaveIcon}
						alt="unsave course"
						className="unsaveIcon icon-dark"
						onClick={() => dispatch(removeCourse(course.courseID))}
					/>
				) : (
					<img
						src={saveIcon}
						alt="save course"
						className="saveIcon icon-dark"
						onClick={() => dispatch(saveCourse(course.courseID))}
					/>
				)}
			</div>
		</div>
	);

	if (course.page === "catalog") {
		return (
			<Link
				to={`/catalog/${course.courseID.replaceAll(" ", "+")}`}
				replace
				style={course.style}
			>
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
