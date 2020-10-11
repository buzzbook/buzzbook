import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
	updateSelectedCourse,
	getSelectedCourse
} from "../../redux/catalogSlice";

function CourseListItem(course) {
	const dispatch = useDispatch();
	const selectedCourse = useSelector(getSelectedCourse);

	let bgColor =
		selectedCourse === course.index ? "var(--low-alpha)" : "initial";

	let enrollmentColor = "var(--green)";
	if (course.enrollmentPercent > 67) enrollmentColor = "var(--red)";
	else if (course.enrollmentPercent > 33) enrollmentColor = "var(--orange)";

	let gradeColor = "green";
	if (course.grade.charAt(0) === "B") gradeColor = "var(--yellow)";
	else if (course.grade.charAt(0) === "C") gradeColor = "var(--orange)";
	else if (course.grade.charAt(0) === "D") gradeColor = "var(--red)";

	return (
		<div
			className="p-3 mb-2 rounded"
			style={{backgroundColor: bgColor}}
			onClick={() => dispatch(updateSelectedCourse(course.index))}
		>
			<h5 className="d-inline">
				<b>{course.courseID}</b>
			</h5>
			&nbsp;&nbsp;&nbsp;
			<span>{course.name}</span>
			<br />
			<span style={{color: enrollmentColor}}>
				{Math.round(course.enrollmentPercent)}% enrollment
			</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span>{course.credits} units</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span>{course.numSections} sections</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span style={{color: gradeColor}}>{course.grade}</span>
		</div>
	);
}

CourseListItem.propTypes = {
	courseID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	enrollmentPercent: PropTypes.number.isRequired,
	credits: PropTypes.number.isRequired,
	numSections: PropTypes.number.isRequired,
	grade: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

export default CourseListItem;
