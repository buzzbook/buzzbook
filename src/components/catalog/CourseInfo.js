import React from "react";
import {useSelector} from "react-redux";
import {
	getFilteredCourses,
	getSelectedCourse
} from "../../redux/courseListSlice";
import RatingBar from "./RatingBar";
import caches from "../../courses";

import enrollmentIcon from "../../img/enrollmentIcon.png";
import gradeIcon from "../../img/gradeIcon.png";
import creditsIcon from "../../img/creditsIcon.png";

function CourseInfo() {
	const filteredCourses = useSelector(getFilteredCourses);
	const selectedCourse = useSelector(getSelectedCourse);

	if (selectedCourse === -1) {
		return <div></div>;
	}

	const courseRaw = filteredCourses[selectedCourse];

	const courseEnrollment = {current: 200, max: 250};
	let enrollmentColor = "var(--green)";
	if ((courseEnrollment.current / courseEnrollment.max) * 100 > 67)
		enrollmentColor = "var(--red)";
	else if ((courseEnrollment.current / courseEnrollment.max) * 100 > 33)
		enrollmentColor = "var(--orange)";

	const courseGrade = "A";
	let gradeColor = "var(--green)";
	if (courseGrade.charAt(0) === "B") gradeColor = "var(--yellow)";
	else if (courseGrade.charAt(0) === "C") gradeColor = "var(--orange)";
	else if (courseGrade.charAt(0) === "D") gradeColor = "var(--red)";

	const course = {
		courseID: courseRaw[4],
		name: courseRaw[0],
		enrollment: courseEnrollment,
		grade: courseGrade,
		credits: Object.values(courseRaw[1])[0][2],
		sections: courseRaw[1],
		description: courseRaw[3]
	};

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
							<div className="d-inline-block">
								{course.credits} credit{course.credits > 1 && "s"}
							</div>
						</div>
					</div>
				</div>
				<div className="col-5">
					<div className="text-muted">Ratings</div>
					<div className="row">
						<div className="col-4">Quality</div>
						<div className="col-6 px-0">
							<RatingBar value={4} highIsBetter={true} />
						</div>
						<div className="col-2 pl-2">{4}/5</div>
					</div>
					<div className="row">
						<div className="col-4">Difficulty</div>
						<div className="col-6 px-0">
							<RatingBar value={3.5} highIsBetter={false} />
						</div>
						<div className="col-2 pl-2">{3.5}/5</div>
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
					{Object.entries(course.sections).map((entry, index) => {
						const [id, sectionRaw] = entry;

						const sectionEnrollment = {current: 20, max: 25};
						let sectionEnrollmentColor = "var(--green)";
						if ((sectionEnrollment.max / sectionEnrollment.current) * 100 > 67)
							sectionEnrollmentColor = "var(--red)";
						else if (
							(sectionEnrollment.max / sectionEnrollment.current) * 100 >
							33
						)
							sectionEnrollmentColor = "var(--orange)";

						const meetings = sectionRaw[1];
						const section = {
							type: caches.scheduleTypes[sectionRaw[3]],
							courseNumber: sectionRaw[0],
							id: id,
							time: caches.periods[meetings[0][0]],
							days: meetings[0][1],
							location: meetings[0][2],
							instructor: meetings[0][4][0]
						};

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
									{sectionEnrollment.current}/{sectionEnrollment.max}
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
