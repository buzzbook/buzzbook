import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	getSelectedCourse,
	updateSelectedCourse,
	getSavedCourses,
	removeCourse,
	saveCourse
} from "../../redux/courseListSlice";
import {useLocation, useHistory, Link} from "react-router-dom";
import RatingBar from "./RatingBar";
import courses, {caches} from "../../courses";

import Icon from "../../img/icon";
import {Helmet} from "react-helmet";

function CourseInfo() {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const selectedCourse = useSelector(getSelectedCourse);
	const savedCourses = useSelector(getSavedCourses);

	let path = location.pathname.split("/");
	if (path.length === 3) {
		let iDParts = path[2].split("+");
		if (iDParts.length === 1) {
			// Current page is just /catalog -> go to selectedCourse (default is the first course in the catalog)
			history.push(`/catalog/${selectedCourse.replaceAll(" ", "+")}`);
		} else {
			let currID = iDParts[0] + " " + iDParts[1];
			if (currID !== selectedCourse) {
				if (courses[currID]) {
					// Will only update selected course to match URL if it's a valid course
					dispatch(updateSelectedCourse(currID));
				} else {
					// Otherwise, update URL to match selected course
					history.push(`/catalog/${selectedCourse.replaceAll(" ", "+")}`);
				}
			}
		}
	}

	if (selectedCourse === "None") {
		return <div></div>;
	}

	const courseRaw = courses[selectedCourse];

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

	const prereqsRaw = courseRaw[2];
	var prereqs;
	if (prereqsRaw.length <= 1) prereqs = <div>None</div>;
	else {
		prereqs = <div>{prereqsHelper(prereqsRaw, true)}</div>;
	}

	function prereqsHelper(val, firstRun) {
		if (!Array.isArray(val)) {
			return (
				<div className="prereq" key={val.id}>
					{courses[val.id] ? (
						<Link
							to={`/catalog/${val.id.replaceAll(" ", "+")}`}
							key={val.id + "L"}
						>
							{val.id}
						</Link>
					) : (
						val.id
					)}
				</div>
			);
		}

		const separator = val[0];
		var output = [];
		for (let i = 1; i < val.length; i++) {
			if ((!firstRun || val.length > 2) && Array.isArray(val[i])) {
				output.push(
					<div className="prereq-container">{prereqsHelper(val[i], false)}</div>
				);
			} else output.push(prereqsHelper(val[i], false));
			if (i !== val.length - 1) {
				output.push(<>{separator}</>);
			}
		}
		return output;
	}

	const course = {
		courseID: selectedCourse,
		name: courseRaw[0],
		enrollment: courseEnrollment,
		grade: courseGrade,
		credits: Object.values(courseRaw[1])[0][2],
		sections: courseRaw[1],
		description: courseRaw[3],
		prerequisites: prereqs
	};

	let isSaved = savedCourses[course.courseID];

	return (
		<>
			<Helmet>
				<title>BuzzBook | {course.courseID}</title>
			</Helmet>
			<div className="" id="courseInfo">
				<div className="row w-100 mx-0">
					<div className="col-4 pl-0">
						<div class="inline">
							<h1>{course.courseID}</h1>
							{isSaved ? (
								<Icon
									name="unsave"
									alt="unsave course"
									iconclass="unsaveIcon icon-dark"
									onClick={() => dispatch(removeCourse(course.courseID))}
								/>
							) : (
								<Icon
									name="save"
									alt="save course"
									iconclass="saveIcon icon-dark"
									onClick={() => dispatch(saveCourse(course.courseID))}
								/>
							)}
						</div>
						<h4 className="theme">{course.name}</h4>
					</div>
					<div className="col-2">
						<div className="text-muted">Statistics</div>
						<div style={{fontSize: "1rem"}}>
							<div style={{whiteSpace: "nowrap"}}>
								<Icon
									name="enrollment"
									alt="enrollment icon"
									width="11px"
									iconclass="d-inline-block mr-1 icon-light"
								/>
								<div
									style={{color: enrollmentColor}}
									className="d-inline-block"
								>
									{course.enrollment.current}/{course.enrollment.max}
								</div>
							</div>
							<div style={{whiteSpace: "nowrap"}}>
								<Icon
									name="grades"
									alt="grade icon"
									width="11px"
									iconclass="d-inline-block mr-1 icon-light"
								/>
								<div style={{color: gradeColor}} className="d-inline-block">
									{course.grade}
								</div>
							</div>
							<div style={{whiteSpace: "nowrap"}}>
								<Icon
									name="credits"
									alt="credits icon"
									width="11px"
									iconclass="d-inline-block mr-1 icon-light"
								/>
								<div className="d-inline-block">
									{course.credits} credit{course.credits !== 1 && "s"}
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

				<hr style={{backgroundColor: "var(--labelcolor)", height: 3, borderTop: "none"}} />

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
							<th scope="col">Section ID</th>
							<th scope="col">CRN</th>
							<th scope="col">Type</th>
							<th scope="col">Enrollment</th>
							<th scope="col">Time</th>
							<th scope="col">Days</th>
							<th scope="col">Location</th>
							<th scope="col">Instructors</th>
							<th scope="col">Attributes</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(course.sections).map(entry => {
							const [id, sectionRaw] = entry;

							const sectionEnrollment = {current: 20, max: 25};
							let sectionEnrollmentColor = "var(--green)";
							if (
								(sectionEnrollment.max / sectionEnrollment.current) * 100 >
								67
							)
								sectionEnrollmentColor = "var(--red)";
							else if (
								(sectionEnrollment.max / sectionEnrollment.current) * 100 >
								33
							)
								sectionEnrollmentColor = "var(--orange)";

							const meetings = sectionRaw[1];
							var instructors = meetings.length > 0 ? "" : "N/A";
							if (instructors !== "N/A") {
								meetings[0][4].forEach((instructor, i) => {
									instructors += instructor;
									if (i !== meetings[0][4].length - 1) instructors += ", ";
								});
							}
							var attributes = "";
							sectionRaw[5].forEach((attribute, index) => {
								attributes += caches.attributes[attribute];
								if (index < sectionRaw[5].length - 1) {
									attributes += ", ";
								}
							});
							const section = {
								type: caches.scheduleTypes[sectionRaw[3]],
								courseNumber: sectionRaw[0],
								id: id,
								time:
									meetings.length > 0 ? caches.periods[meetings[0][0]] : "N/A",
								days:
									meetings.length > 0 && meetings[0][1] !== "&nbsp;"
										? meetings[0][1]
										: "N/A",
								location: meetings.length > 0 ? meetings[0][2] : "N/A"
							};

							return (
								<tr key={section.id}>
									<td>{section.id}</td>
									<td>{section.courseNumber}</td>
									<td>{section.type}</td>
									<td style={{color: sectionEnrollmentColor}}>
										{sectionEnrollment.current}/{sectionEnrollment.max}
									</td>
									<td>{section.time}</td>
									<td>{section.days}</td>
									<td>{section.location}</td>
									<td>{instructors}</td>
									<td>{attributes}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default CourseInfo;
