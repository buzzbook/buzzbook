import React from "react";
import CourseInfo from "../components/catalog/CourseInfo";
import Layout from "./Layout";

import "../css/Catalog.css";

function Catalog() {
	const filterList = {term: true, credits: true, subject: true, level: true, core: true, days: true, time: true, prof: true}
	return (
		<Layout
			id="Catalog"
			/* col1Content={(
				<div>
					<Search
						id="catalog"
						label1="Browse"
						label2="Compare"
						sortOptionList={["Course ID", "Name", "Grade", "Difficulty", "Enrollment"]}
					/>
					<Filters 
						id="catalog"
						filterList={filterList}
					/>
				</div>)} */
			content={<CourseInfo />}
		/>
	);
}

export default Catalog;
