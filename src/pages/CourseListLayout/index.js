import React, {useState} from "react";
import CourseList from "../../components/courseList/CourseList";
import SavedCoursesDetails from "../../components/savedCoursesDetails/SavedCoursesDetails";
import FilterBar from "../../components/filters/FilterBar";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../../redux/courseListSlice";
// import {usePreload} from "../img/icon";
// import stylechanges from "../unused";
import './CourseListLayout.scss';

function Layout({id, content, savedCoursesDetails}) { 	 
	const {isSaved,setIsSaved } = useState(false);

	const savedCourses = useSelector(getSavedCourses);
	let numSaved = Object.keys(savedCourses).length;

	const col = savedCoursesDetails && numSaved > 0 ? "1fr 1fr 2fr" : "1fr 3fr";
	// const contentStyle = `${col} h-100 pl-0`;
	//stylechanges();
	return (
		<div className="course-layout pad-v__8 ">
			<div className="gap-v__3">
				<div className="flex flex-center">
					<button className={"secondary-button-solid pure-button " + ( isSaved ? "" : "active")}>
						Search Classes
					</button>
					<button className={"secondary-button-solid pure-button " + ( isSaved ? "active" : "")}>
						Saved Classes
					</button>
				</div>
			<FilterBar />
			<div
				id={id}

				className = "mx-0"
			>
				<div
					className="px-4"

				>
					{<CourseList id={id} />}
				</div>
				{savedCoursesDetails && numSaved > 0 && (
					<div className="p-3" style={{minWidth: "250px"}}>
						{<SavedCoursesDetails id={id} />}
					</div>
				)}
				
			</div>
			</div>
		
			<div>{content}</div>
		</div>
	);
}

export default Layout;
