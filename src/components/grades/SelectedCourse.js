import React from "react";
import {useDispatch} from "react-redux";
import {removeCourse} from "../../redux/gradesSlice";

function SelectedCourse(course) {
	const dispatch = useDispatch();
	return (
		<div>
			<div>
				<span style={{fontSize: "1.25rem"}}>
					<b>{course.courseID}</b>
				</span>
				&nbsp;&nbsp;&nbsp;
				<span>{course.name}</span>
			</div>
			<div
				className="grades-selectedCourses-x"
				onClick={() => dispatch(removeCourse(course.index))}
			>
				X
			</div>
		</div>
	);
}

export default SelectedCourse;
