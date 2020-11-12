import React from "react";
import Layout from "./CourseListLayout";
import EnrollmentGraph from "../components/enrollment/EnrollmentGraph";

function Enrollment() {
	return <Layout id="enrollment" content={<EnrollmentGraph />} />;
}

export default Enrollment;
