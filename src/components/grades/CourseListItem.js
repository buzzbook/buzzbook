import React from "react";
import {useDispatch} from "react-redux";
import {addCourse} from "../../redux/gradesSlice";

function CourseListItem(course) {
	const dispatch = useDispatch();
	return (
		<div>
			<span
				className="grades-courseList-plus"
				onClick={() => dispatch(addCourse(course.index))}
				// onClick={() => dispatch(addCourse(1))}
			>
				+
			</span>
			&nbsp;&nbsp;
			<span style={{fontSize: "1.25rem"}}>
				<b>{course.courseID}</b>
			</span>
			&nbsp;&nbsp;&nbsp;
			<span>{course.name}</span>
		</div>
	);
}

export default CourseListItem;
