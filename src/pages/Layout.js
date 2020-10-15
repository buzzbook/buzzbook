import React, {useLayoutEffect} from "react";
import Filters from "../components/grades/Filters";
import SelectedCourses from "../components/grades/SelectedCourses";
import "../css/Grades.css";
import CourseList from "../components/grades/CourseList";

function Layout({col1Content, col2Content, col3Content}) {
	useLayoutEffect(() => {
		let navHeight =
			document.getElementById("navbar").getBoundingClientRect().height + 2;
		document.getElementById(
			"grades"
		).style.height = `calc(100vh - ${navHeight}px)`;
	});
	return (
		<div className="col-page row mx-0" id="grades">
			<div className="col-3 h-100 p-3">
				{col1Content}
			</div>
			<div className="col-3 h-100 p-3">
				{col2Content}
			</div>
			<div className="col-6 h-100 p-3">
				{col3Content}
			</div>
		</div>
	);
}

export default Layout;
