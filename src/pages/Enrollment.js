import React from "react";
import Helmet from "react-helmet";
import Layout from "./CourseListLayout";
import EnrollmentGraph from "../components/enrollment/EnrollmentGraph";

function Enrollment() {
	return (
		<>
			<Helmet>
				<title>BuzzBook | Enrollment</title>
			</Helmet>
			<Layout
				id="enrollment"
				savedCoursesDetails
				content={<EnrollmentGraph />}
			/>
		</>
	);
}

export default Enrollment;
