import React from "react";
import {useSelector} from "react-redux";
import {getSavedCourses} from "../../redux/courseListSlice";
// Webpack import not working for some reason
// import {graphic} from "../../img/gradesPageGraphic.png";

function ScheduleGraph() {
	const savedCourses = useSelector(getSavedCourses);

	if (Object.keys(savedCourses).length === 0) {
		return (
			<div className="text-center">
				<br />
				<h3>Save some courses to get started!</h3>
				<br />
				<img
					src={require("../../img/gradesPageGraphic.png")}
					alt="select courses"
					style={{maxHeight: "60vh", width: "auto"}}
				/>
			</div>
		);
	} else {
		return <h1>Schedule</h1>;
	}
}

export default ScheduleGraph;
