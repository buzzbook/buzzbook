import React from "react";
import CourseListItem from "./CourseListItem";

const courses = [
	{
		courseID: "MATH 1553",
		name: "Intro to Linear Algebra",
		enrollment: 86,
		credits: 4,
		sections: 47,
		grade: "B"
	},
	{
		courseID: "MATH 1554",
		name: "Linear Algebra",
		enrollment: 92,
		credits: 4,
		sections: 30,
		grade: "B-"
	},
	{
		courseID: "MATH 1771",
		name: "Finite Mathematics",
		enrollment: 100,
		credits: 4,
		sections: 4,
		grade: "B"
	}
];

function CourseList() {
	return (
		<div id="courseList">
			{courses.map((course, index) => {
				return (
					<CourseListItem
						courseID={course.courseID}
						name={course.name}
						enrollment={course.enrollment}
						credits={course.credits}
						sections={course.sections}
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
