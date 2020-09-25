import React from "react";
import CourseListItem from "./CourseListItem";
import courses from "./courses";
import {useSelector} from "react-redux";
import {getFilters} from "../../redux/catalogSlice";

/** Keys are the courseID values. Values are the long names */
const subjectNames = {
	MATH: "Mathematics",
	CS: "Computer Science"
};

function CourseList() {
	const filters = useSelector(getFilters);
	const filteredCourses = courses.filter(course => {
		if (filters.credits !== "Any") {
			// eslint-disable-next-line
			if (course.credits != filters.credits) return false;
		}
		if (filters.subject !== "Any") {
			let subject = subjectNames[course.courseID.split(" ")[0]];
			if (subject !== filters.subject) return false;
		}
		if (filters.level !== "Any") {
			let level = parseInt(course.courseID.split(" ")[1].charAt(0)) * 1000;
			// eslint-disable-next-line
			if (level != filters.level) return false;
		}
		return true;
	});

	return (
		<div id="catalog-courseList">
			{filteredCourses.map((course, index) => {
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
