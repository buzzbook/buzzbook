import React, {useLayoutEffect} from "react";
import CourseList from "../components/courseList/CourseList";
import FilterBar from "../components/filters/FilterBar";

function Layout({id, content}) {
	useLayoutEffect(() => {
		let filterBarHeight =
			document.getElementById("filterBar").getBoundingClientRect().height + 2;
		document.getElementById(
			"courseList"
		).parentElement.style.height = `calc(93vh - ${filterBarHeight}px)`;
	});
	return (
		<div>
			<FilterBar />
			<div className="row mx-0" id={id}>
				<div className="col-3 h-100 p-3">{<CourseList id={id} />}</div>
				<div className="col-9 h-100 p-3">{content}</div>
			</div>
		</div>
	);
}

export default Layout;
