import React from "react";
import CourseList from "../components/courseList/CourseList";
import SavedCoursesDetails from "../components/savedCoursesDetails/SavedCoursesDetails";
import FilterBar from "../components/filters/FilterBar";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../redux/courseListSlice";

function Layout({id, content, savedCoursesDetails}) {
	const savedCourses = useSelector(getSavedCourses);
	let numSaved = Object.keys(savedCourses).length;

	const filterHeight = "80px";
	const col = savedCoursesDetails && numSaved > 0 ? "1fr 1fr 2fr" : "1fr 3fr";

	return (
		<div
			style={{
				display: "grid",
				height: "100vh",
				gridTemplateRows: `${filterHeight} auto`
			}}
		>
			<FilterBar />
			<div
				id={id}
				style={{
					display: "grid",
					gridTemplateColumns: col
				}}
			>
				<div
					className="p-3"
					style={{
						minWidth: "300px",
						height: `calc(100vh - ${filterHeight}`
					}}
				>
					{<CourseList id={id} />}
				</div>
				{savedCoursesDetails && numSaved > 0 && (
					<div className="p-3" style={{minWidth: "250px"}}>
						{<SavedCoursesDetails id={id} />}
					</div>
				)}
				<div className="p-3">{content}</div>
			</div>
		</div>
	);
}

export default Layout;
