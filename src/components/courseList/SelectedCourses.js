import React from "react";
import {useSelector} from "react-redux";
import {getSelectedCourses} from "../../redux/courseListSlice";
import SelectedCourse from "./SelectedCourse";

const courses = JSON.parse(window.localStorage.getItem("courses"));

function SelectedCourses() {
	const selectedCoursesIndeces = useSelector(getSelectedCourses);
	let selectedCourses = [];
	selectedCoursesIndeces.forEach(index => selectedCourses.push(courses[index]));

	return (
		<div className="px-2 mt-2">
			<div>
				{selectedCourses.map((course, index) => {
					return (
						<SelectedCourse
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

export default SelectedCourses;
