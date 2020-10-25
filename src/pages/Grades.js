import React from "react";
import Layout from "./Layout";

function Grades() {
	const filterList = { term: true, credits: true, subject: true, level: true, core: true, days: false, time: false, prof: false }

	return (
		<Layout
			id="grades"
			/* col1Content={(
				<div>
					<Search
						id="grades"
						label1="Browse"
						label2="Compare"
						sortOptionList={["Course ID", "Name", "Grade", "Difficulty", "Enrollment"]}
					/>
					<Filters 
						id="grades"
						filterList={filterList} 
					/>
					<CourseList />
				</div>
			)} */
			// col2Content={<SelectedCourses />}
			content={<h1>Graph</h1>}
		/>
	);
}

export default Grades;
