import React from "react";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../../redux/courseListSlice";
import courses from "../../courses";
import SavedCourse from "./SavedCourse";

function SavedCourses() {
	const savedCourses = useSelector(getSavedCourses);

	return (
		<div className="px-2">
			<div>
				{Object.keys(savedCourses).map((id, index) => {
					return (
						<SavedCourse
							courseID={id}
							name={courses[id][0]}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default SavedCourses;
