import React from "react";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../../redux/courseListSlice";
import courses from "../../scripts/courses";
import SavedCourseItem from "./SavedCourseItem";
import "../../css/SavedCoursesDetails.css";

function SavedCoursesDetails({id}) {
	const savedCoursesIDs = useSelector(getSavedCourses);

	return (
		<div style={{height: "calc(95vh - 88px)"}} className="customhoverscroll">
			<div style={{height: "100%"}}>
				{Object.keys(savedCoursesIDs).map(courseID => {
					const courseData = courses[courseID];
					const courseGrade = "A";
					const course = {
						name: courseData[0],
						grade: courseGrade,
						credits: Object.values(courseData[1])[0][2],
						sections: courseData[1],
						description: courseData[3]
					};
					return (
						<SavedCourseItem
							courseID={courseID}
							name={course.name}
							grade={course.grade}
							credits={course.credits}
							sections={course.sections}
							key={courseID}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default SavedCoursesDetails;
