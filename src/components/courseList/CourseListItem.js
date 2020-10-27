import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
	updateSelectedCourse,
	getSelectedCourse,
	getSavedCourses,
	removeCourseByIndex
} from "../../redux/courseListSlice";
import {saveCourse} from "../../redux/courseListSlice";
import saveIcon from "../../img/saveIcon.png";
import unsaveIcon from "../../img/unsaveIcon.png";

function CourseListItem(course) {
	const dispatch = useDispatch();
	const selectedCourse = useSelector(getSelectedCourse);
	const savedCourses = useSelector(getSavedCourses);

	let isSelected = selectedCourse === course.index;
	let bgColor = isSelected ? "var(--low-alpha)" : "initial";

	let isSaved = savedCourses.includes(course.index);

	let enrollmentColor = "var(--green)";
	if (course.enrollmentPercent > 67) enrollmentColor = "var(--red)";
	else if (course.enrollmentPercent > 33) enrollmentColor = "var(--orange)";

	let gradeColor = "green";
	if (course.grade.charAt(0) === "B") gradeColor = "var(--yellow)";
	else if (course.grade.charAt(0) === "C") gradeColor = "var(--orange)";
	else if (course.grade.charAt(0) === "D") gradeColor = "var(--red)";

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
				</div>

				{isSaved ? (
					<img
						src={unsaveIcon}
						alt="unsave course"
						className="unsaveIcon icon-dark"
						onClick={() => dispatch(removeCourseByIndex(course.index))}
					/>
				) : (
					<img
						src={saveIcon}
						alt="save course"
						className="saveIcon icon-dark"
						onClick={() => dispatch(saveCourse(course.index))}
					/>
				)}
			</div>
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