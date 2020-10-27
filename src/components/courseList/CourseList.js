import React from "react";
import {useSelector} from "react-redux";
import {
	getFilters,
	getSavedCourses,
	getSort
} from "../../redux/courseListSlice";
import CourseListItem from "./CourseListItem";
import SavedCourses from "./SavedCourses";
import "../../css/CourseList.css";

const courses = JSON.parse(window.localStorage.getItem("courses"));

/** Keys are the courseID values. Values are the long names */
export const subjectNames = {
	CHEM: "Chemistry",
	CS: "Computer Science",
	ECON: "Economics",
	MATH: "Mathematics",
	PHYS: "Physics"
};

function CourseList({id}) {
	const filters = useSelector(getFilters);
	const sort = useSelector(getSort);
	var savedCoursesIndeces = useSelector(getSavedCourses);

	const filteredCourses = courses
		.filter(course => {
			if (id !== "catalog" && savedCoursesIndeces.includes(course.index)) {
				return false;
			}
			if (filters.credits && filters.credits !== "Any") {
        // eslint-disable-next-line
        const creditFilterBy = filters.credits.map(option => option.value);
        if (!creditFilterBy.includes(course.credits)) return false;
			}
			if (filters.subject && filters.subject !== "Any") {
        let subject = subjectNames[course.courseID.split(" ")[0]];
        const subjectFilterBy = filters.subject.map(option => option.value);
        if (!subjectFilterBy.includes(subject)) return false;
			}
			if (filters.level && filters.level !== "Any") {
				let level = parseInt(course.courseID.split(" ")[1].charAt(0)) * 1000;
        // eslint-disable-next-line
        const levelFilterBy = filters.level.map(option => option.value);
        if (!levelFilterBy.includes(level)) return false;
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

	return (
		<div>
			<div style={{height: "100%"}}>
				<div id="courseList">
					{filteredCourses.length === 0 ? (
						<div className="text-center mt-2">
							<h2>No classes match your filters :(</h2>
						</div>
					) : (
						filteredCourses.map((course, index) => {
							let sections = course.sections
								? course.sections
								: courses[0].sections;
							return (
								<CourseListItem
									courseID={course.courseID}
									name={course.name}
									enrollmentPercent={
										(course.enrollment.current / course.enrollment.max) * 100
									}
									credits={course.credits}
									numSections={sections.length}
									grade={course.grade}
									index={course.index}
									key={index}
								/>
							);
						})
					)}
				</div>

				<div
					className="gt-gold font-weight-bold pl-2 mt-2"
					style={{fontSize: "1.25rem"}}
				>
					Saved Courses
				</div>
				<div id="savedCourses">
					<SavedCourses />
				</div>
			</div>
		</div>
	);
}

export default CourseList;
