import React, { useLayoutEffect } from "react";
import CourseList from "../components/courseList/CourseList";

function Layout({ id, content }) {
	return (
		<div className="col-page row mx-0" id={id}>
			<div className="col-3 h-100 p-3">
				{<CourseList />}
			</div>
			<div className="col-9 h-100 p-3">
				{content}
			</div>
		</div>
	);
}

export default Layout;
