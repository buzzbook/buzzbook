import React from "react";
import {useDispatch} from "react-redux";
import {removeCourse} from "../../redux/courseListSlice";
import deleteIcon from "../../img/deleteIcon.png";

function SavedCourse(course) {
	const dispatch = useDispatch();
	return (
		<div className="position-relative">
			<div
				className="savedCourse text-cutoff"
				style={{maxWidth: "calc(100% - 25px)"}}
			>
				<span style={{fontSize: "1.25rem"}}>
					<b>{course.courseID}</b>
				</span>
				&nbsp;&nbsp;&nbsp;
				<span>{course.name}</span>
			</div>

			<img
				src={deleteIcon}
				alt="delete course"
				className="deleteIcon"
				onClick={() => dispatch(removeCourse(course.courseID))}
			/>
		</div>
	);
}

export default SavedCourse;
