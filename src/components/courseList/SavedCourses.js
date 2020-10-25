import React from "react";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../../redux/courseListSlice";
import SavedCourse from "./SavedCourse";

const courses = JSON.parse(window.localStorage.getItem("courses"));

function SavedCourses() {
	const savedCoursesIndeces = useSelector(getSavedCourses);
	let savedCourses = [];
	savedCoursesIndeces.forEach(index => savedCourses.push(courses[index]));

	return (
		<div className="px-2">
			<div>
				{savedCourses.map((course, index) => {
					return (
						<SavedCourse
							courseID={course.courseID}
							name={course.name}
							index={index}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default SavedCourses;
