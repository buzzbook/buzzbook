import React from "react";
import CourseListItem from "./CourseListItem";
import courses from "./courses";

function CourseList() {
	return (
		<div id="courseList">
			{courses.map((course, index) => {
				return (
					<CourseListItem
						courseID={course.courseID}
						name={course.name}
						enrollmentPercent={
							(course.enrollment.current / course.enrollment.max) * 100
						}
						credits={course.credits}
						numSections={course.sections.length}
						grade={course.grade}
						index={index}
						key={index}
					/>
				);
			})}
		</div>
	);
}

export default CourseList;
