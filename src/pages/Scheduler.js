import React from "react";
import Layout from "./CourseListLayout";
import ScheduleGraph from "../components/scheduler/ScheduleGraph";


function Scheduler() {
	return <Layout id="scheduler" content={<ScheduleGraph />} />;
}

export default Scheduler;
