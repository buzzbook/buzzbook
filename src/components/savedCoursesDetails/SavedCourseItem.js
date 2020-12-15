import React from "react";
import PropTypes from "prop-types";
import FilterSelector from "../filters/FilterSelector";

function SavedCourseItem(course) {
	let enrollmentColor = "var(--green)";
	if (course.enrollmentPercent >= 100) enrollmentColor = "var(--crimson)";
	else if (course.enrollmentPercent > 67) enrollmentColor = "var(--red)";
	else if (course.enrollmentPercent > 33) enrollmentColor = "var(--orange)";
	return (
		<div className="p-2 mb-2 rounded">
			<div className="position-relative">
				<div style={{maxWidth: "calc(100% - 25px)"}}>
					<div className="text-cutoff">
						<h5 className="d-inline">
							<b>{course.courseID}</b>
						</h5>
						&nbsp;&nbsp;&nbsp;
						<span>{course.name}</span>
					</div>
					<FilterSelector
						placeholder="All Professors"
						optionList={["Prof 1", "Prof 2", "Prof 3"]}
					/>
					<FilterSelector
						placeholder="All Semesters"
						optionList={["Spring 21", "Fall 20", "Spring 20"]}
					/>

					<div style={{fontSize: "0.9rem"}}>
						<span>
							{course.enrollment.current} /{" "}
							{course.enrollment.max}
						</span>
						<span style={{fontWeight: "900"}}>
							&nbsp;&bull;&nbsp;
						</span>
						<span style={{color: enrollmentColor}}>
							{Math.round(course.enrollmentPercent)}% enrollment
						</span>
						<span style={{fontWeight: "900"}}>
							&nbsp;&bull;&nbsp;
						</span>
						<span>Graph</span>
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
	grade: PropTypes.string.isRequired
};

export default SavedCourseItem;
