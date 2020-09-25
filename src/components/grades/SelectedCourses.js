import React from "react";
import {useSelector} from "react-redux";
import {getSelectedCourses} from "../../redux/gradesSlice";
import SelectedCourse from "./SelectedCourse";

const courses = JSON.parse(window.localStorage.getItem("courses"));

function SelectedCourses() {
	const selectedCoursesIndeces = useSelector(getSelectedCourses);
	let selectedCourses = [];
	selectedCoursesIndeces.forEach(index => selectedCourses.push(courses[index]));

	return (
		<div>
			<div className="gt-gold font-weight-bold" style={{fontSize: "1.25rem"}}>
				Selected Courses
			</div>
			{selectedCourses.map((course, index) => {
				console.log(course);
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
	);
}

export default SelectedCourses;
