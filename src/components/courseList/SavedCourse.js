import React from "react";
import {useDispatch} from "react-redux";
import {
	updateSelectedCourse,
	removeCourse
} from "../../redux/courseListSlice";
import {Link, useLocation} from "react-router-dom";
import Icon from "../../img/icon";

function SavedCourse(course) {
	const dispatch = useDispatch();
	const isCatalog = useLocation().pathname.includes("catalog");

	const innercontent = (
		<>
		<span className="headingfont">{course.courseID}</span>
		&nbsp;&nbsp;
		<span className="subheadingfont">{course.name}</span>
		</>
	);

	return (
		<div className="position-relative">
			<div
				className="savedCourse text-cutoff"
				style={{maxWidth: "calc(100% - 25px)"}}
			>
				{isCatalog ? (
					<Link
						onClick={() => dispatch(updateSelectedCourse(course.courseID))}
						to={`/catalog/${course.courseID.replaceAll(" ", "+")}`}
						style={course.style}
						className="text-link"
					>
						{innercontent}
					</Link>
				) : (
					innercontent
				)}
			</div>
			{/* Semi-fixed Error: when natively using onClick on icon component, clicking any delete button deletes the last added course instead, might be related to issue with preloader, the icons are getting refetched everytime rendered and hence called using the last assinged courseID
			<img
				src={deleteIcon}
				alt="delete course"
				className="deleteIcon"
				onClick={() => dispatch(removeCourse(course.courseID))}
			/>*/}
			<div
				onClick={() => dispatch(removeCourse(course.courseID))}
			>
				<Icon
					name="delete"
					alt="delete course"
					iconclass="deleteIcon"
				/>
			</div>
      <span>
        {Object.keys(course.sections).join(', ')}
      </span>
		</div>
	);
}

export default SavedCourse;
