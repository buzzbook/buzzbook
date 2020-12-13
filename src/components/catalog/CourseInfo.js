import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	getSelectedCourse,
	updateSelectedCourse,
	getSavedCourses,
	removeCourse,
	saveCourse
} from "../../redux/courseListSlice";
import {useHistory, useLocation, Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import BeatLoader from "react-spinners/BeatLoader";
import RatingBar from "./RatingBar";
import courses, {caches} from "../../courses";

import enrollmentIcon from "../../img/enrollmentIcon.png";
import gradeIcon from "../../img/gradeIcon.png";
import creditsIcon from "../../img/creditsIcon.png";
import saveIcon from "../../img/saveIcon.png";
import unsaveIcon from "../../img/unsaveIcon.png";

var prevSelectedCourse;
var profGrades;

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

	const [gradesLoaded, updateGradesLoaded] = useState(false);

	if (prevSelectedCourse !== selectedCourse) {
		prevSelectedCourse = selectedCourse;
		updateGradesLoaded(false);
		profGrades = {};
		let courseQuery = selectedCourse.replaceAll(" ", "%20");
		// For CHEM 1211K/1212K
		if (courseQuery.charAt(courseQuery.length - 1) === "K") {
			courseQuery = courseQuery.substr(0, courseQuery.length - 1);
		}
		fetch(`https://c4citk6s9k.execute-api.us-east-1.amazonaws.com/test/data/course?courseID=${courseQuery}`)
			.then(resp => resp.json()) // Transform the data into json
			.then(data => {
				if (data && data.raw.length > 0) {
					data.raw.forEach(instructor => {
						let split = instructor.instructor_name.split(", ");
						let name = split[1] + " " + split[0];
						profGrades[name] = instructor.GPA;
					});
				}
				updateGradesLoaded(true);
			});
	}

	const courseRaw = courses[selectedCourse];

	const courseEnrollment = {current: 200, max: 250};
	let enrollmentColor = "var(--green)";
	if ((courseEnrollment.current / courseEnrollment.max) * 100 > 67) enrollmentColor = "var(--red)";
	else if ((courseEnrollment.current / courseEnrollment.max) * 100 > 33) enrollmentColor = "var(--orange)";

	const courseGrade = courseRaw[4] || -1;
	let gradeColor = "var(--main-text)";
	if (courseGrade !== -1) {
		if (courseGrade < 3) gradeColor = "var(--red)";
		else if (courseGrade < 3.25) gradeColor = "var(--orange)";
		else if (courseGrade < 3.5) gradeColor = "var(--yellow)";
		else gradeColor = "var(--green)";
	}

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
						<Link to={`/catalog/${val.id.replaceAll(" ", "+")}`} key={val.id + "L"}>
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
				output.push(<div className="prereq-container">{prereqsHelper(val[i], false)}</div>);
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
				<div
					className="w-100 mx-0"
					style={{
						display: "grid",
						gridTemplateColumns: "3fr auto 5fr",
						gap: "0 15px"
					}}
				>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr auto",
							gridTemplateAreas: "'ID icon' 'name icon'"
						}}
					>
						<h1 className="d-inline-block mr-2" style={{gridArea: "ID"}}>
							{course.courseID}
						</h1>
						<h4 className="gt-gold" style={{gridArea: "name"}}>
							{course.name}
						</h4>
						{isSaved ? (
							<img
								src={unsaveIcon}
								alt="unsave course"
								className="unsaveIcon icon-dark"
								onClick={() => dispatch(removeCourse(course.courseID))}
							/>
						) : (
							<img
								src={saveIcon}
								alt="save course"
								className="saveIcon icon-dark"
								onClick={() => dispatch(saveCourse(course.courseID))}
							/>
						)}
					</div>
					<div>
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
									{course.grade === -1 ? <>Not found</> : course.grade}
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
									{course.credits} credit
									{course.credits !== 1 && "s"}
								</div>
							</div>
						</div>
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "auto 3fr 50px",
							gap: "0 10px"
						}}
					>
						<div className="text-muted" style={{gridArea: "1 / 1 / 1 / 1"}}>
							Ratings
						</div>

						{/* Quality */}
						<div style={{gridArea: "2 / 1 / 2 / 1"}}>Quality</div>
						<div style={{gridArea: "2 / 2 / 2 / 2"}}>
							<RatingBar value={4} highIsBetter={true} />
						</div>
						<div style={{gridArea: "2 / 3 / 2 / 3"}}>{4}/5</div>

						{/* Difficulty */}
						<div style={{gridArea: "3 / 1 / 3 / 1"}}>Difficulty</div>
						<div style={{gridArea: "3 / 2 / 3 / 2"}}>
							<RatingBar value={3.5} highIsBetter={false} />
						</div>
						<div style={{gridArea: "3 / 3 / 3 / 3"}}>{3.5}/5</div>
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
							<th scope="col">Section ID</th>
							<th scope="col">CRN</th>
							<th scope="col">Type</th>
							<th scope="col">Enrollment</th>
							<th scope="col">Instructor Grades</th>
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
							if ((sectionEnrollment.max / sectionEnrollment.current) * 100 > 67)
								sectionEnrollmentColor = "var(--red)";
							else if ((sectionEnrollment.max / sectionEnrollment.current) * 100 > 33)
								sectionEnrollmentColor = "var(--orange)";

							const meetings = sectionRaw[1];
							var instructors = meetings.length > 0 ? "" : "N/A";
							var instructorArr;
							if (instructors !== "N/A") {
								instructorArr = [];
								meetings[0][4].forEach((instructor, i) => {
									if (instructor.charAt(instructor.length - 1) === " ") {
										instructor = instructor.substr(0, instructor.length - 1);
									}
									instructors += instructor;
									instructorArr.push(instructor);
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
							var grades = ["N/A"];
							if (gradesLoaded && instructorArr && instructorArr[0] !== "TBA") {
								grades = [];
								instructorArr.forEach(instructor => {
									let profName = instructor.split(" (P)")[0];
									grades.push(profGrades[profName] || "Not found");
								});
							}
							var sectionGradeColors = [];
							grades.forEach(grade => {
								let sectionGradeColor = "var(--main-text)";
								if (typeof grade === "number") {
									if (grade < 3) sectionGradeColor = "var(--red)";
									else if (grade < 3.25) sectionGradeColor = "var(--orange)";
									else if (grade < 3.5) sectionGradeColor = "var(--yellow)";
									else sectionGradeColor = "var(--green)";
								}
								sectionGradeColors.push(sectionGradeColor);
							});
							const section = {
								type: caches.scheduleTypes[sectionRaw[3]],
								courseNumber: sectionRaw[0],
								id: id,
								time: meetings.length > 0 ? caches.periods[meetings[0][0]] : "N/A",
								days: meetings.length > 0 && meetings[0][1] !== "&nbsp;" ? meetings[0][1] : "N/A",
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
									<td>
										{gradesLoaded ? (
											grades.map((grade, i) => {
												return (
													<>
														<span
															style={{
																color: sectionGradeColors[i]
															}}
														>
															{grade}
														</span>
														{i < grades.length - 1 && <>, </>}
													</>
												);
											})
										) : (
											<BeatLoader size={8} margin={0} color="var(--main-text)" />
											// <>Loading...</>
										)}
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
