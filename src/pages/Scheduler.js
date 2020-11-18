import React from "react";
import Helmet from "react-helmet";
import Layout from "./CourseListLayout";
import ScheduleGraph from "../components/scheduler/ScheduleGraph";

function Scheduler() {
	return (
		<>
			<Helmet>
				<title>BuzzBook | Scheduler</title>
			</Helmet>
			<Layout id="scheduler" content={<ScheduleGraph />} />
		</>
	);
}

export default Scheduler;
