import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {updateSelectedCourse} from "../../redux/actions";

function CourseListItem(props) {
	const dispatch = useDispatch();
	const selectedCourse = useSelector(state => state.selectedCourse);
	const setSelectedCourse = val => updateSelectedCourse(dispatch, val);

	let bgColor =
		selectedCourse === props.index ? "rgba(255,255,255,0.05)" : "initial";

	let enrollmentColor = "green";
	if (props.enrollment > 67) enrollmentColor = "red";
	else if (props.enrollment > 33) enrollmentColor = "orange";

	let gradeColor = "green";
	if (props.grade.charAt(0) === "B") gradeColor = "yellow";
	else if (props.grade.charAt(0) === "C") gradeColor = "orange";
	else if (props.grade.charAt(0) === "D") gradeColor = "red";

	return (
		<div
			className="p-3 mb-2 rounded"
			style={{backgroundColor: bgColor}}
			onClick={() => setSelectedCourse(props.index)}
		>
			<h5 className="d-inline">
				<b>{props.courseID}</b>
			</h5>
			&nbsp;&nbsp;&nbsp;
			<span>{props.name}</span>
			<br />
			<span style={{color: enrollmentColor}}>
				{props.enrollment}% enrollment
			</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span>{props.credits} units</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span>{props.sections} sections</span>
			<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
			<span style={{color: gradeColor}}>{props.grade}</span>
		</div>
	);
}

CourseListItem.propTypes = {
	courseID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	enrollment: PropTypes.number.isRequired,
	credits: PropTypes.number.isRequired,
	sections: PropTypes.number.isRequired,
	grade: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

export default CourseListItem;
