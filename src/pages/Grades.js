import React from "react";
import Layout from "./CourseListLayout";
import GradesGraph from "../components/grades/GradesGraph";

function Grades() {
	return <Layout id="grades" content={<GradesGraph />} />;
}

export default Grades;
