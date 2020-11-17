import React from "react";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../../redux/courseListSlice";
import SavedCourse from "./SavedCourse";

const courses = JSON.parse(window.localStorage.getItem("courses"));

function SavedCourses() {
	const savedCoursesIDs = useSelector(getSavedCourses);

	return (
		<div className="px-2">
			<div>
				{Object.keys(savedCoursesIDs).map((id, index) => {
					return (
						<SavedCourse courseID={id} name={courses[id][0]} key={index} />
					);
				})}
			</div>
		</div>
	);
}

export default SavedCourses;
