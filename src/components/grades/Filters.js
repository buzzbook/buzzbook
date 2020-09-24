import React from "react";

const courses = [
	{courseID: "MATH 1551", name: "Differential Calculus"},
	{courseID: "MATH 1552", name: "Integral Calculus"},
	{courseID: "MATH 1553", name: "Introduction to Linear Algebra"},
	{courseID: "MATH 1554", name: "Linear Algebra"},
	{courseID: "MATH 1564", name: "Linear Algebra with Abstract Vector Spaces"},
	{courseID: "MATH 1711", name: "Fintie Mathematics"},
	{courseID: "MATH 2550", name: "Introduction to Multivariable Calculus"},
	{courseID: "MATH 2551", name: "Multivariable Calculus"},
	{courseID: "MATH 2552", name: "Differential Equations"},
	{courseID: "MATH 2602", name: "Linear and Discrete Mathematics"},
	{courseID: "MATH 2603", name: "Introduction to Descrete Mathematics"}
];

function Filters() {
	return (
		<div>
			<div
				className="mx-n3 px-3"
				style={{borderBottom: "2px solid var(--border)"}}
			>
				<div className="mb-1 font-weight-bold">
					<span className="gt-gold" style={{cursor: "pointer"}}>
						Grading Distributions
					</span>
				</div>
				<input type="text" className="form-control mb-2" placeholder="Search" />
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="sort-by-label">
							Sort By
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Sort By"
						aria-describedby="sort-by-label"
						defaultValue="Select"
					>
						<option disabled>Select</option>
						<option>Course ID</option>
						<option>Name</option>
						<option>Grade</option>
						<option>Difficulty (Ascending)</option>
					</select>
				</div>

				<div className="mb-1 font-weight-bold">
					<span className="gt-gold">Filters</span>&nbsp;&nbsp;
					<span className="text-muted" style={{cursor: "pointer"}}>
						Clear
					</span>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="term-label">
							Term
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Term"
						aria-describedby="term-label"
						defaultValue="Select"
					>
						<option disabled>Select</option>
						<option>Fall 2020</option>
						<option>Spring 2021</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="credits-label">
							Credits
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Credits"
						aria-describedby="credits-label"
						defaultValue="Select"
					>
						<option disabled>Select</option>
						<option>2</option>
						<option>4</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="subject-label">
							Subject
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Subject"
						aria-describedby="subject-label"
						defaultValue="Select"
					>
						<option disabled>Select</option>
						<option>Math</option>
						<option>Computer Science</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="level-label">
							Level
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Level"
						aria-describedby="level-label"
						defaultValue="Select"
					>
						<option disabled>Select</option>
						<option>1000</option>
						<option>2000</option>
						<option>3000</option>
						<option>4000</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="core-label">
							Core
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Core"
						aria-describedby="core-label"
						defaultValue="Select"
					>
						<option disabled>Select</option>
						<option>Test 1</option>
						<option>Test 2</option>
					</select>
				</div>
			</div>
			<div>
				{courses.map((course, index) => (
					<div
						style={{
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis"
						}}
						key={index}
					>
						<span
							style={{fontSize: "2rem", color: "#00ff00", cursor: "pointer"}}
						>
							+
						</span>
						&nbsp;
						<span style={{fontSize: "1.25rem"}}>
							<b>{course.courseID}</b>
						</span>
						&nbsp;&nbsp;&nbsp;
						<span>{course.name}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default Filters;
