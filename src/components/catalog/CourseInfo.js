import React from "react";
import {useSelector} from "react-redux";
import {
	getFilteredCourses,
	getSelectedCourse
} from "../../redux/courseListSlice";
import RatingBar from "./RatingBar";

import enrollmentIcon from "../../img/enrollmentIcon.png";
import gradeIcon from "../../img/gradeIcon.png";
import creditsIcon from "../../img/creditsIcon.png";

const courses = JSON.parse(window.localStorage.getItem("courses"));

function CourseInfo() {
	const filteredCourses = useSelector(getFilteredCourses);
	const selectedCourse = useSelector(getSelectedCourse);

	if (selectedCourse === -1) {
		return <div></div>;
	}

	const course = filteredCourses[selectedCourse];

	let enrollmentColor = "var(--green)";
	if ((course.enrollment.current / course.enrollment.max) * 100 > 67)
		enrollmentColor = "var(--red)";
	else if ((course.enrollment.current / course.enrollment.max) * 100 > 33)
		enrollmentColor = "var(--orange)";

	let gradeColor = "var(--green)";
	if (course.grade.charAt(0) === "B") gradeColor = "var(--yellow)";
	else if (course.grade.charAt(0) === "C") gradeColor = "var(--orange)";
	else if (course.grade.charAt(0) === "D") gradeColor = "var(--red)";

	let sections = course.sections ? course.sections : courses[0].sections;

	return (
		<div className="" id="courseInfo">
			<div className="row w-100 mx-0">
				<div className="col-4 pl-0">
					<h1>{course.courseID}</h1>
					<h4 className="gt-gold">{course.name}</h4>
				</div>
				<div className="col-2">
					<div className="text-muted">Statistics</div>
					<div style={{fontSize: "0.8rem"}}>
						<div style={{whiteSpace: "nowrap"}}>
							<img
								src={enrollmentIcon}
								alt="enrollment icon"
								width="15px"
								className="d-inline-block mr-1 icon-light"
							/>
							<div style={{color: enrollmentColor}} className="d-inline-block">
								{course.enrollment.current}/{course.enrollment.max}
							</div>
						</div>
						<div style={{whiteSpace: "nowrap"}}>
							<img
								src={gradeIcon}
								alt="grade icon"
								width="15px"
								className="d-inline-block mr-1 icon-light"
							/>
							<div style={{color: gradeColor}} className="d-inline-block">
								{course.grade}
							</div>
						</div>
						<div style={{whiteSpace: "nowrap"}}>
							<img
								src={creditsIcon}
								alt="credits icon"
								width="15px"
								className="d-inline-block mr-1 icon-light"
							/>
							<div className="d-inline-block">{course.credits} units</div>
						</div>
					</div>
				</div>
				<div className="col-5">
					<div className="text-muted">Ratings</div>
					<div className="row">
						<div className="col-4">Interest</div>
						<div className="col-6 px-0">
							<RatingBar value={course.ratings.interest} highIsBetter={true} />
						</div>
						<div className="col-2 pl-2">{course.ratings.interest}/5</div>
					</div>
					<div className="row">
						<div className="col-4">Difficulty</div>
						<div className="col-6 px-0">
							<RatingBar
								value={course.ratings.difficulty}
								highIsBetter={false}
							/>
						</div>
						<div className="col-2 pl-2">{course.ratings.difficulty}/5</div>
					</div>
				</div>
			</div>

			<hr style={{backgroundColor: "var(--med-alpha)", height: 2}} />

			<div className="text-muted">Description</div>
			<div className="mb-3">{course.description}</div>

			<div className="text-muted">Prerequisites</div>
			<div className="mb-3">{course.prerequisites}</div>

			<div className="text-muted">Enrollment Restrictions</div>
			<div className="mb-3">{course.enrollRestrictions}</div>

			<div className="text-muted">Class Sections</div>
			<table className="table-responsive">
				<thead>
					<tr>
						<th scope="col">Type</th>
						<th scope="col">Course #</th>
						<th scope="col">ID</th>
						<th scope="col">Time</th>
						<th scope="col">Days</th>
						<th scope="col">Location</th>
						<th scope="col">Instructor</th>
						<th scope="col">Enrollment</th>
					</tr>
				</thead>
				<tbody>
					{sections.map((section, index) => {
						let sectionEnrollmentColor = "var(--green)";
						if (
							(section.enrollment.max / section.enrollment.current) * 100 >
							67
						)
							sectionEnrollmentColor = "var(--red)";
						else if (
							(section.enrollment.max / section.enrollment.current) * 100 >
							33
						)
							sectionEnrollmentColor = "var(--orange)";
						return (
							<tr key={index}>
								<td>{section.type}</td>
								<td>{section.courseNumber}</td>
								<td>{section.id}</td>
								<td>{section.time}</td>
								<td>{section.days}</td>
								<td>{section.location}</td>
								<td>{section.instructor}</td>
								<td style={{color: sectionEnrollmentColor}}>
									{section.enrollment.current}/{section.enrollment.max}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default CourseInfo;
