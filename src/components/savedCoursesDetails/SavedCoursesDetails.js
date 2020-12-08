import React from "react";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../../redux/courseListSlice";
import courses from "../../courses";
import SavedCourseItem from "./SavedCourseItem";
import "../../css/SavedCoursesDetails.css";

function SavedCoursesDetails({id}) {
	const savedCoursesIDs = useSelector(getSavedCourses);

	return (
		<div style={{height: "calc(95vh - 88px)", overflowY: "scroll"}}>
			<div style={{height: "100%"}}>
				{Object.keys(savedCoursesIDs).map(courseID => {
					const courseData = courses[courseID];
					const courseEnrollment = {current: 200, max: 250};
					const courseGrade = "A";
					const course = {
						name: courseData[0],
						enrollment: courseEnrollment,
						grade: courseGrade,
						credits: Object.values(courseData[1])[0][2],
						sections: courseData[1],
						description: courseData[3]
					};
					return (
						<SavedCourseItem
							courseID={courseID}
							name={course.name}
							enrollment={course.enrollment}
							enrollmentPercent={
								(course.enrollment.current /
									course.enrollment.max) *
								100
							}
							credits={course.credits}
							grade={course.grade}
							key={courseID}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default SavedCoursesDetails;
