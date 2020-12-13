import React, {useLayoutEffect} from "react";
import CourseList from "../components/courseList/CourseList";
import SavedCoursesDetails from "../components/savedCoursesDetails/SavedCoursesDetails";
import FilterBar from "../components/filters/FilterBar";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../redux/courseListSlice";
import {usePreload} from "../img/icon";

function Layout({id, content, savedCoursesDetails}) {
	useLayoutEffect(() => {
		let filterBarHeight =
			document.getElementById("filterBar").getBoundingClientRect().height + 2;
		document.getElementById(
			"courseList"
		).parentElement.style.height = `calc(93vh - ${filterBarHeight}px)`;
	});

	const initload = usePreload("./iconset.svg");
	console.log("initially loaded");

	const savedCourses = useSelector(getSavedCourses);
	let numSaved = Object.keys(savedCourses).length;

	const col = savedCoursesDetails && numSaved > 0 ? "col-6" : "col-9";
	const contentStyle = `${col} h-100`;
	return (
		<div>
			<FilterBar />
			<div className="row mx-0" id={id}>
				<div className="col-3 h-100">{<CourseList id={id} />}</div>
				{savedCoursesDetails && numSaved > 0 && (
					<div className="col-3 h-100 p-3">
						{<SavedCoursesDetails id={id} />}
					</div>
				)}
				<div className={contentStyle}>{content}</div>
			</div>
		</div>
	);
}

export default Layout;
