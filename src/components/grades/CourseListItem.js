import React from "react";

function CourseListItem(course) {
	return (
		<div>
			<span className="grades-courseList-plus">+</span>
			&nbsp;&nbsp;
			<span style={{fontSize: "1.25rem"}}>
				<b>{course.courseID}</b>
			</span>
			&nbsp;&nbsp;&nbsp;
			<span>{course.name}</span>
		</div>
	);
}

export default CourseListItem;
