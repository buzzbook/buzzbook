import React from "react";
import CourseList from "../components/courseList/CourseList";
import SavedCoursesDetails from "../components/savedCoursesDetails/SavedCoursesDetails";
import FilterBar from "../components/filters/FilterBar";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../redux/courseListSlice";
import {usePreload} from "../img/icon";
//import stylechanges from "../unused";

function Layout({id, content, savedCoursesDetails}) {
	// useLayoutEffect(() => {
	// 	let filterBarHeight =
	// 		document.getElementById("filterBar").getBoundingClientRect().height + 2;
	// 	document.getElementById(
	// 		"courseList"
	// 	).parentElement.style.height = `calc(93vh - ${filterBarHeight}px)`;
	// });

	const initload = usePreload("./iconset.svg");
	console.log("initially loaded");

	// const filterHeight = "80px";

	const savedCourses = useSelector(getSavedCourses);
	let numSaved = Object.keys(savedCourses).length;

	const col = savedCoursesDetails && numSaved > 0 ? "1fr 1fr 2fr" : "1fr 3fr";
	// const contentStyle = `${col} h-100 pl-0`;
	//stylechanges();
	return (
		<div
			style={{
				display: "grid",
				height: "100vh",
				gridTemplateRows: `max-content auto`
			}}
		>
			<FilterBar />
			<div
				id={id}
				style={{
					display: "grid",
					gridTemplateColumns: col
				}}
				className = "mx-0"
			>
				<div
					className="px-4"
					style={{
						minWidth: "300px"
					}}
				>
					{<CourseList id={id} />}
				</div>
				{savedCoursesDetails && numSaved > 0 && (
					<div className="p-3" style={{minWidth: "250px"}}>
						{<SavedCoursesDetails id={id} />}
					</div>
				)}
				<div>{content}</div>
			</div>
		</div>
	);
}

export default Layout;
