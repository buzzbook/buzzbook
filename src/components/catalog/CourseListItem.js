import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
	updateSelectedCourse,
	getSelectedCourse
} from "../../redux/catalogSlice";

function CourseListItem(props) {
	const dispatch = useDispatch();
	const selectedCourse = useSelector(getSelectedCourse);

	let bgColor =
		selectedCourse === props.index ? "var(--course-selected)" : "initial";

	let enrollmentColor = "var(--green)";
	if (props.enrollmentPercent > 67) enrollmentColor = "var(--red)";
	else if (props.enrollmentPercent > 33) enrollmentColor = "var(--orange)";

	let gradeColor = "green";
	if (props.grade.charAt(0) === "B") gradeColor = "var(--yellow)";
	else if (props.grade.charAt(0) === "C") gradeColor = "var(--orange)";
	else if (props.grade.charAt(0) === "D") gradeColor = "var(--red)";

	return (
		<div
			className="p-3 mb-2 rounded"
			style={{backgroundColor: bgColor}}
			onClick={() => dispatch(updateSelectedCourse(props.index))}
		>
			<h5 className="d-inline">
				<b>{props.courseID}</b>
			</h5>
			&nbsp;&nbsp;&nbsp;
			<span>{props.name}</span>
			<br />
			<span style={{color: enrollmentColor}}>
				{Math.round(props.enrollmentPercent)}% enrollment
			</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span>{props.credits} units</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span>{props.numSections} sections</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span style={{color: gradeColor}}>{props.grade}</span>
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
