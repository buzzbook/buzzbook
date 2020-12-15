import React from "react";
import {useDispatch} from "react-redux";
import {removeCourse} from "../../redux/courseListSlice";
import Icon from "../../img/icon";

function SavedCourse(course) {
	const dispatch = useDispatch();
	return (
		<div className="position-relative">
			<div
				className="savedCourse text-cutoff"
				style={{maxWidth: "calc(100% - 25px)"}}
			>
				<span className="headingfont">
					{course.courseID}
				</span>
				&nbsp;&nbsp;
				<span className="subheadingfont">{course.name}</span>
			</div>

			<Icon
				name="delete"
				alt="delete course"
				iconclass="deleteIcon"
				onClick={() => dispatch(removeCourse(course.courseID))}
			/>
		</div>
	);
}

export default SavedCourse;
