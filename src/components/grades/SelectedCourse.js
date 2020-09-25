import React from "react";
import {useDispatch} from "react-redux";
import {removeCourse} from "../../redux/gradesSlice";

function SelectedCourse(course) {
	const dispatch = useDispatch();
	return (
		<div>
			<span style={{fontSize: "1.25rem"}}>
				<b>{course.courseID}</b>
			</span>
			&nbsp;&nbsp;&nbsp;
			<span>{course.name}</span>
			&nbsp;&nbsp;
			<span
				style={{cursor: "pointer", color: "red"}}
				onClick={() => dispatch(removeCourse(course.index))}
			>
				X
			</span>
		</div>
	);
}

export default SelectedCourse;
