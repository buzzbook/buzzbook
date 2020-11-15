import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
	updateSelectedCourse,
	getSelectedCourse
} from "../../redux/courseListSlice";

function SavedCourseItem(course) {
	const dispatch = useDispatch();
	const selectedCourse = useSelector(getSelectedCourse);

	let isSelected = selectedCourse === course.index;
	let bgColor = isSelected ? "var(--low-alpha)" : "initial";

	let enrollmentColor = "var(--green)";
	if (course.enrollmentPercent > 67) enrollmentColor = "var(--red)";
	else if (course.enrollmentPercent > 33) enrollmentColor = "var(--orange)";

	return (
		<div
			className="p-2 mb-2 rounded"
			style={{backgroundColor: bgColor}}
			onClick={() => dispatch(updateSelectedCourse(course.index))}
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
						<span>
							{course.enrollment.current} / {course.enrollment.max}
						</span>
						<span style={{fontWeight: "900"}}>&nbsp;&bull;&nbsp;</span>
						<span style={{color: enrollmentColor}}>
							{Math.round(course.enrollmentPercent)}% enrollment
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

SavedCourseItem.propTypes = {
	courseID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	enrollmentPercent: PropTypes.number.isRequired,
	credits: PropTypes.number.isRequired,
	grade: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

export default SavedCourseItem;
