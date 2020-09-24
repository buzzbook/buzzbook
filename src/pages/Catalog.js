import React from "react";
import Filters from "../components/catalog/Filters";
import CourseList from "../components/catalog/CourseList";

import "../css/Catalog.css";

function Catalog() {
	return (
		<div className="row mx-0" id="catalog">
			<div className="col-3 p-3">
				<Filters />
			</div>
			<div className="col-3 p-3">
				<CourseList />
			</div>
			<div className="col-6 p-3">
				<h2>Class Info</h2>
			</div>
		</div>
	);
}

export default Catalog;
