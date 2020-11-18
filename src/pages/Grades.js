import React from "react";
import Helmet from "react-helmet";
import Layout from "./CourseListLayout";
import GradesGraph from "../components/grades/GradesGraph";

function Grades() {
	return (
		<>
			<Helmet>
				<title>BuzzBook | Grades</title>
			</Helmet>
			<Layout id="grades" savedCoursesDetails content={<GradesGraph />} />
		</>
	);
}

export default Grades;
