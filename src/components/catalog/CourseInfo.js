import React from "react";
import {useSelector} from "react-redux";
import {getSelectedCourse} from "../../redux/catalogSlice";
import RatingBar from "./RatingBar";
import courses from "./courses";

function CourseInfo() {
	const selectedCourse = useSelector(getSelectedCourse);
	const course = courses[selectedCourse];

	let enrollmentColor = "var(--green)";
	if ((course.enrollment.max / course.enrollment.current) * 100 > 67)
		enrollmentColor = "var(--red)";
	else if ((course.enrollment.max / course.enrollment.current) * 100 > 33)
		enrollmentColor = "var(--orange)";

	let gradeColor = "var(--green)";
	if (course.grade.charAt(0) === "B") gradeColor = "var(--yellow)";
	else if (course.grade.charAt(0) === "C") gradeColor = "var(--orange)";
	else if (course.grade.charAt(0) === "D") gradeColor = "var(--red)";

	return (
		<div className="pt-3 px-4" id="courseInfo">
			<div className="row w-100 mx-0">
				<div className="col-4 pl-0">
					<h1>{course.courseID}</h1>
					<h4 className="gt-gold">{course.name}</h4>
				</div>
				<div className="col-2">
					<div className="text-muted">Statistics</div>
					<div style={{fontSize: "0.8rem"}}>
						<div style={{color: enrollmentColor}}>
							{course.enrollment.current}/{course.enrollment.max}
						</div>
						<div style={{color: gradeColor}}>{course.grade}</div>
						<div>{course.credits} units</div>
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

			<hr style={{backgroundColor: "var(--course-hover)", height: 2}} />

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
					{course.sections.map((section, index) => {
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
