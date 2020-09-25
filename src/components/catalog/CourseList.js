import React, {useEffect, useLayoutEffect} from "react";
import CourseListItem from "./CourseListItem";
import {useDispatch, useSelector} from "react-redux";
import {
	updateCourses,
	updateSelectedCourse,
	getSelectedCourse,
	getFilters,
	getSort
} from "../../redux/catalogSlice";
import courses from "./courses";

/** Keys are the courseID values. Values are the long names */
const subjectNames = {
	MATH: "Mathematics",
	CS: "Computer Science",
	PHYS: "Physics"
};

function CourseList() {
	const dispatch = useDispatch();
	const filters = useSelector(getFilters);
	const sort = useSelector(getSort);
	const selectedCourse = useSelector(getSelectedCourse);
	const filteredCourses = courses
		.filter(course => {
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
	useLayoutEffect(() => {
		dispatch(updateCourses(filteredCourses));
	});

	const changeSelected = event => {
		if (event.keyCode === 40) {
			if (selectedCourse < filteredCourses.length - 1)
				dispatch(updateSelectedCourse(selectedCourse + 1));
		}
		if (event.keyCode === 38) {
			if (selectedCourse > 0)
				dispatch(updateSelectedCourse(selectedCourse - 1));
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", changeSelected, false);

		return () => {
			document.removeEventListener("keydown", changeSelected, false);
		};
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
