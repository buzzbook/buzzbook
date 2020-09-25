import React, {useLayoutEffect} from "react";
import Filters from "../components/catalog/Filters";
import CourseList from "../components/catalog/CourseList";
import CourseInfo from "../components/catalog/CourseInfo";

import "../css/Catalog.css";

function Catalog() {
	useLayoutEffect(() => {
		let navHeight = document.getElementById("navbar").getBoundingClientRect()
			.height;
		document.getElementById(
			"catalog"
		).style.height = `calc(100vh - ${navHeight}px)`;
	});
	return (
		<div className="col-page row mx-0" id="catalog">
			<div className="col-3 h-100 p-3">
				<Filters />
			</div>
			<div className="col-3 h-100 p-3">
				<CourseList />
			</div>
			<div className="col-6 h-100 p-3">
				<CourseInfo />
			</div>
		</div>
	);
}

export default Catalog;
