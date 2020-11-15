import React from "react";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../../redux/courseListSlice";
import SavedCourseItem from "./SavedCourseItem";
import "../../css/SavedCoursesDetails.css";

const courses = JSON.parse(window.localStorage.getItem("courses"));

function SavedCoursesDetails({id}) {
	const savedCoursesIndeces = useSelector(getSavedCourses);
	let savedCourses = [];
	savedCoursesIndeces.forEach(index => savedCourses.push(courses[index]));

	return (
		<div>
			<div style={{height: "100%"}}>
				{savedCourses.map((courseRaw, index) => {
					const courseEnrollment = {current: 200, max: 250};
					const courseGrade = "A";
					const course = {
						courseID: courseRaw[4],
						name: courseRaw[0],
						enrollment: courseEnrollment,
						grade: courseGrade,
						credits: Object.values(courseRaw[1])[0][2],
						sections: courseRaw[1],
						description: courseRaw[3]
					};
					return (
						<SavedCourseItem
							courseID={course.courseID}
							name={course.name}
							enrollment={course.enrollment}
							enrollmentPercent={
								(course.enrollment.current / course.enrollment.max) * 100
							}
							credits={course.credits}
							grade={course.grade}
							index={course.index}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default SavedCoursesDetails;
