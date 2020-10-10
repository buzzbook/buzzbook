import React from "react";
import CourseListItem from "./CourseListItem";
import {useSelector} from "react-redux";
import {getFilters, getSelectedCourses, getSort} from "../../redux/gradesSlice";
import {subjectNames} from "../catalog/CourseList";

const courses = JSON.parse(window.localStorage.getItem("courses"));

function CourseList() {
	const filters = useSelector(getFilters);
	const sort = useSelector(getSort);
	var selectedCoursesIndeces = useSelector(getSelectedCourses);

	const filteredCourses = courses
		.map((course, index) => {
			course["index"] = index;
			return course;
		})
		.filter(course => {
			if (selectedCoursesIndeces.includes(course.index)) {
				return false;
			}
			if (filters.credits && filters.credits !== "Any") {
				// eslint-disable-next-line
				if (course.credits != filters.credits) return false;
			}
			if (filters.subject && filters.subject !== "Any") {
				let subject = subjectNames[course.courseID.split(" ")[0]];
				if (subject !== filters.subject) return false;
			}
			if (filters.level && filters.level !== "Any") {
				let level = parseInt(course.courseID.split(" ")[1].charAt(0)) * 1000;
				// eslint-disable-next-line
				if (level != filters.level) return false;
			}
			return true;
		})
		.sort((a, b) => {
			switch (sort) {
				case "Course ID":
					let aSplit = a.courseID.split(" ");
					let bSplit = b.courseID.split(" ");
					if (aSplit[0] === bSplit[0]) {
						return parseInt(aSplit[1]) - parseInt(bSplit[1]);
					}
					return aSplit[0].localeCompare(bSplit[0]);
				case "Name":
					return a.name.localeCompare(b.name);
				case "Grade":
					if (a.grade.charAt(0) === b.grade.charAt(0)) {
						let modifiers = {
							"+": 0,
							"": 1,
							"-": 2
						};
						return modifiers[a.grade.charAt(1)] - modifiers[b.grade.charAt(1)];
					}
					return a.grade.charAt(0).localeCompare(b.grade.charAt(0));
				case "Difficulty":
					return a.ratings.difficulty - b.ratings.difficulty;
				case "Enrollment":
					let aPercent = a.enrollment.current / a.enrollment.max;
					let bPercent = b.enrollment.current / b.enrollment.max;
					return aPercent - bPercent;
				default:
					return 0;
			}
		});

	if (filteredCourses.length === 0) {
		return (
			<div className="text-center mt-2">
				<h2>No classes match your filters :(</h2>
			</div>
		);
	}

	return (
		<div id="grades-courseList">
			{filteredCourses.map((course, index) => {
				return (
					<CourseListItem
						courseID={course.courseID}
						name={course.name}
						index={course.index}
						key={index}
					/>
				);
			})}
		</div>
	);
}

export default CourseList;
