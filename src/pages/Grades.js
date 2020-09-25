import React, {useLayoutEffect} from "react";
import Filters from "../components/grades/Filters";
import SelectedCourses from "../components/grades/SelectedCourses";
import "../css/Grades.css";

function Grades() {
	useLayoutEffect(() => {
		let navHeight = document.getElementById("navbar").getBoundingClientRect()
			.height;
		document.getElementById(
			"grades"
		).style.height = `calc(100vh - ${navHeight}px)`;
	});
	return (
		<div className="col-page row mx-0" id="grades">
			<div className="col-3 h-100 p-3">
				<Filters />
			</div>
			<div className="col-3 h-100 p-3">
				<SelectedCourses />
			</div>
			<div className="col-6 h-100 p-3">
				<h1>Graph</h1>
			</div>
		</div>
	);
}

export default Grades;
