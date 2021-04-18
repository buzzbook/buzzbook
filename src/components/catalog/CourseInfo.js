import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedCourse,
  updateSelectedCourse,
  getSavedCourses,
  removeCourse,
  saveCourse,
  toggleSection,
  getFilters
} from "../../redux/courseListSlice";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import BeatLoader from "react-spinners/BeatLoader";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import RatingBar from "./RatingBar";
import courses, { caches } from "../../scripts/courses";
import Alert from "../settings/Alerts";
import {determineGradeLetter, determineGradeColor, determineRatingColor} from "../settings/StatsUtils";
import $ from 'jquery';

import Icon from "../../img/icon";

var prevSelectedCourse;
var profGrades;
var courseRatings;
var secRatings;

function CourseInfo() {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const selectedCourse = useSelector(getSelectedCourse);
	const savedCourses = useSelector(getSavedCourses);
	const filters = useSelector(getFilters);

	const courseRaw = courses[selectedCourse];
	const courseEnrollment = {current: 200, max: 250};
	const course = {
		courseID: selectedCourse,
		name: courseRaw[0],
		enrollment: courseEnrollment,
		//grade: courseGrade,
		credits: Object.values(courseRaw[1])[0][2],
		sections: courseRaw[1],
		description: courseRaw[3],
		//prerequisites: prereqs
	};

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
const [ratingsLoaded, updateRatingsLoaded] = useState(false);
const [secRatingsLoaded, updateSecRatingsLoaded] = useState(false);
  
  // React Table set up
  const enrollmentFormatter = (cell, row) => {
	const enrollPercent = row.enrollmentCurrent / row.enrollmentMax
    if (enrollPercent * 100 > 67)
      return (
        <span style={{ color: 'var(--red' }}>
          {cell}
        </span>
      )
    else if (enrollPercent * 100 > 33) {
      return (
        <span style={{ color: 'var(--orange' }}>
          {cell}
        </span>
      )
    } else {
      return (
        <span style={{ color: 'var(--green' }}>
          {cell}
        </span>
      )
    }
  };

  const gradeFormatter = (cell, row) => {
    if (gradesLoaded) {
      if (row.grade === 'N/A') {
        return (
          <span>N/A</span>
        );
      } else {
        return (
          <span style={{ color: determineGradeColor(row.grade) }}>{cell}</span>
        );
      }
    } else {
      return (
        <BeatLoader size={8} margin={0} color="var(--secondarytextcolor)" />
      );
    }
  };

  const sortGrades = (a, b, order, dataField, rowA, rowB) => {
    if (rowA.grade === rowB.grade) {
      return 0;
    }
    if (order === 'asc') {
      // N/A's sort after anything else
      if (rowA.grade === "N/A") {
        return 1;
      }
      else if (rowB.grade === "N/A") {
        return -1;
      }
      return rowB.grade - rowA.grade;
    } else {
      if (rowA.grade === "N/A") {
        return -1;
      }
      else if (rowB.grade === "N/A") {
        return 1;
      }
      return rowA.grade - rowB.grade; // desc
    }
  };

  const ratingsFormatter = (cell, row) => {
	  if (secRatingsLoaded) {
		  var tempRating = row.secRating.map((entry, i) => {
			return (
				<>
					<span
						style = {{color: i !== 2 && typeof entry !== "string" ? determineRatingColor(entry, 5, true) : "var(--secondarytextcolor"}}
					>
						{entry}
					</span>
					{i < row.secRating.length - 1 && <>, </>}
				</>
			)
		  })
		  return (<span style = {{whiteSpace:"nowrap"}}>{tempRating}</span>)
	  } else {
		  return (
			  <BeatLoader size={8} margin={0} color = "var(--secondarytextcolor)" />
		  )
	  }
  }

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    }, {
      dataField: 'courseNumber',
      text: 'CRN',
      sort: true,
    }, {
      dataField: 'type',
      text: 'Type',
      sort: true,
    }, {
      dataField: 'enrollmentFormatted',
      text: 'Enrollment',
      sort: true,
      formatter: enrollmentFormatter,
    }, {
      dataField: 'time',
      text: 'Time',
      sort: true,
    }, {
      dataField: 'days',
      text: 'Days',
      sort: true,
    }, {
      dataField: 'location',
      text: 'Location',
      sort: true,
    }, {
      dataField: 'instructors',
      text: 'Instructors',
      sort: true,
    }, {
		dataField: 'gradeFormatted',
		text: 'Grades',
		sort: true,
		sortFunc: sortGrades,
		formatter: gradeFormatter,
	}, {
		dataField: 'secRating',
		text: 'Ratings',
		sort: true,
		formatter: ratingsFormatter,
	}, {
      dataField: 'attributes',
      text: 'Attributes',
      sort: true,
    }, {
		dataField: 'campus',
		text: 'Campus',
		sort: true,
		hidden: filters.campus.value === "Any",
	  },
  ];

  const selectRow = {
    mode: 'checkbox',
    hideSelectAll: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      dispatch(toggleSection({ [selectedCourse]: row.id }));
    },
    selected: (savedCourses[selectedCourse] !== undefined) && Object.keys(savedCourses[selectedCourse]['sections']),
  } //marker 1: react-table

	if (prevSelectedCourse !== selectedCourse) {
		prevSelectedCourse = selectedCourse;
		updateGradesLoaded(false);
		updateRatingsLoaded(false);
		updateSecRatingsLoaded(false);
		$(".tooltip").tooltip("hide");
		profGrades = {};
		secRatings = {};
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

		const [dept, num] = selectedCourse.split(" ")
		fetch(`http://localhost:4000/byCourse?dept=${dept}&num=${num}`)
			.then(resp => resp.json())
			.then(data => {
				courseRatings = {courseEff: (data.courseEff ? +data.courseEff.toFixed(2) : 0), profEff: (data.courseEff ? +data.profEff.toFixed(2): 0), hours: (data.courseEff ? data.hoursPer : 0)}
				updateRatingsLoaded(true);
			})
					
		var instrList = Object.values(course.sections).map(i => i[1].some(a => a.length > 1) ? i[1][0][4][0] : "N/A")
		instrList = [...new Set(instrList)]
		const profCount = instrList.filter(a => a !== "N/A").length 
		if (profCount !== 0) {
			instrList.forEach((instr, i) => {
				// console.log(instr)
				let instrQuery = instr.replace("(P)", " ").trim().split(" ")
				let instrSQL = "%" + [instrQuery[instrQuery.length - 1], instrQuery[0]].join("%") + "%"			
				fetch(`http://localhost:4000/byProfandCourse/?dept=%&num=%&prof=${instrSQL}`) //temporarily not piping dept for test
					.then(resp => resp.json())
					.then(data => {
						// console.log(data)
						if (!(data.courseEff === null && data.profEff === null && data.hoursPer === null)){
							secRatings[instr] = data
						}
						if (i === instrList.length - 1){
							updateSecRatingsLoaded(true);
						}
					})
			})
		}

	}

	courseRatings = courseRatings || {courseEff: 0, profEff: 0, hours: 0};
	
	let enrollmentColor = "var(--green)";
	if ((courseEnrollment.current / courseEnrollment.max) * 100 > 67) enrollmentColor = "var(--red)";
	else if ((courseEnrollment.current / courseEnrollment.max) * 100 > 33) enrollmentColor = "var(--orange)";

	const courseGrade = courseRaw[4] || -1;
	course.grade = courseGrade
	const gradeColor = determineGradeColor(courseGrade);

	const [alertmsg, setalertmsg] = useState(<></>);
	// function prereqMsg(msg) {
	// 	showAlert = true;
	// 	setalertmsg(<Alert show={true}>{msg}</Alert>);
	// 	//console.log("pressed " + " " + msg);
	// 	// var alertList = document.querySelectorAll('.alert')
	// 	// alertList.forEach(function (alert) {
	// 	//   new bootstrap.Alert(alert)
	// 	// })
	// }

	const prereqsRaw = courseRaw[2];
	var prereqs;
	if (prereqsRaw.length <= 1) prereqs = <div>None</div>;
	else {
		prereqs = <div>{prereqsHelper(prereqsRaw, true)}</div>;
	}

	function prereqsHelper(val, firstRun) {
		if (!Array.isArray(val)) {
			if (courses[val.id]){
				return (
					<Link to={`/catalog/${val.id.replaceAll(" ", "+")}`} key={val.id + "L"} className="prereq contentfont" data-toggle="tooltip" data-html="true" title={courses[val.id][0]}>
						<div key={val.id}>{val.id}</div>
					</Link>
				);
			}else if(val.id.slice(val.id.length - 4).includes("X")){
				return (<div className="prereq" onClick={() => setalertmsg(<Alert>{val.id} is not an offered course, it is used solely for credit purposes.</Alert>)} key={val.id}>{val.id}</div>);
			}else{
				return (<div className="prereq" onClick={() => setalertmsg(<Alert>Sorry, we do not have {val.id} on record at the moment.</Alert>)} key={val.id}>{val.id}</div>);
			}
		}

		const separator = val[0];
		var output = [];
		for (let i = 1; i < val.length; i++) {
			if ((!firstRun || val.length > 2) && Array.isArray(val[i])) {
				output.push(<>&#65339;{prereqsHelper(val[i], false)}&#65341;</>);
			} else output.push(prereqsHelper(val[i], false));
			if (i !== val.length - 1) {
				output.push(<>{separator}</>);
			}
		}
		return output;
	}
	course.prerequisites = prereqs

	$(document).ready(function(e){
		$('[data-toggle="tooltip"]').tooltip();
	});
	// $('[data-toggle="tooltip"]').on('click', function () {
  	// 	$(this).tooltip('hide')
	// })

	let isSaved = savedCourses[course.courseID];

	const lettergrade = determineGradeLetter(course.grade);
	let sharedAttr = Object.values(course.sections).map(i => i[5]).reduce((a,b) => a.filter(c => b.includes(c)))
	let sharedAttrEle = sharedAttr.map(attr => <div className="prereq">{caches.attributes[attr]}</div>)

  const DescriptionSection = ({title, id, className, children}) => {
    const key = `${id}-collapsed`;
    const headerName = `${id}-header`;
    let initCollapsed = JSON.parse(localStorage.getItem(key));
    if (!(key in localStorage)){
      initCollapsed = false;
    }
    const [collapsed, setCollapsed] = useState(initCollapsed);
    const toggleCollapse = () => {
      $(`#${headerName}`).toggleClass("savecollapsed");
      localStorage.setItem(key, $(`#${headerName}`).hasClass("savecollapsed"));
      setCollapsed(!collapsed);
    };
    return (
      <div id={headerName} className={(initCollapsed ? "savecollapsed test-collapse" : "test-collapse")}>
        <div id="section-header" className="inline mt-2" onClick={toggleCollapse}>
          <div className="sectionlabelfont">{title}</div>
          <Icon
            name="collapse"
            alt="collapse"
            iconclass="iconfilter"
            style={{marginLeft: ".5rem"}}
          />
        </div>
        {!collapsed && (
          <div className={`mb-3 contentfont ${className}`}>{children}</div>
        )}
      </div>
    )
  };

    const courseSectionData = [];
  Object.entries(course.sections).forEach(entry => {
    const [id, sectionRaw] = entry;

	const sectionEnrollment = {current: 20, max: 25};
	// let sectionEnrollmentColor = "var(--green)"; determined in column
	// if ((sectionEnrollment.max / sectionEnrollment.current) * 100 > 67)
	// 	sectionEnrollmentColor = "var(--red)";
	// else if ((sectionEnrollment.max / sectionEnrollment.current) * 100 > 33)
	// 	sectionEnrollmentColor = "var(--orange)";

	const meetings = sectionRaw[1];
	var instructors = meetings.length > 0 ? "" : "N/A";
	var instructorArr = [];
	if (instructors !== "N/A") {
		instructorArr = [];
		meetings[0][4].forEach((instructor, i) => {
			if (instructor.charAt(instructor.length - 1) === " ") {
				instructor = instructor.substr(0, instructor.length - 1);
			}
			instructors += instructor.replace("(P)", "");
			instructorArr.push(instructor);
			if (i !== meetings[0][4].length - 1) instructors += ", ";
		});
	}
	var attributes = "";
	sectionRaw[5].forEach((attribute, index) => {
		if (!sharedAttr.includes(attribute)){
			attributes += caches.attributes[attribute];
			if (index < sectionRaw[5].length - 1) {
				attributes += ", ";
			}
		}
	});
	var grades = ["N/A"];
	if (gradesLoaded && instructorArr && instructorArr[0] !== "TBA") {
		grades = [];
		instructorArr.forEach(instructor => {
			let profName = instructor.split(" (P)")[0];
			grades.push(profGrades[profName] || "N/A");
		});
	}
	var sectionGradeColors = [];
	var sectionGradeLetters = [];
	grades.forEach(grade => {
		sectionGradeColors.push(determineGradeColor(grade));
		sectionGradeLetters.push(determineGradeLetter(grade));
	});
	var secRating = [null, null, null]
	if (secRatingsLoaded) {					
		secRating = secRatings[instructorArr[0]]
		if (typeof secRating !== "undefined") {
			secRating = Object.values(secRating)
		} else {
			secRating = ["N/A", "N/A", "N/A"]
		}
	}

    const section = {
      id: id,
      courseNumber: sectionRaw[0],
      type: caches.scheduleTypes[sectionRaw[3]],
      enrollmentFormatted: `${sectionEnrollment.current}/${sectionEnrollment.max}`,
      enrollmentCurrent: sectionEnrollment.current,
      enrollmentMax: sectionEnrollment.max,
      gradeFormatted: `${sectionGradeLetters[0]} ${grades[0]}`,
      grade: grades[0],
      time: meetings.length > 0 ? caches.periods[meetings[0][0]] : "N/A",
      days: meetings.length > 0 && meetings[0][1] !== "&nbsp;" ? meetings[0][1] : "N/A",
      location: meetings.length > 0 ? meetings[0][2] : "N/A",
      instructors: instructors,
      attributes: attributes,
      campus: caches.campuses[sectionRaw[4]],
	  secRating: secRating
    };
    courseSectionData.push(section);
  });

  

	return (
		<>
			<Helmet>
				<title>BuzzBook | {course.courseID}</title>
			</Helmet>
			<div className="mr-4" id="courseInfo">
				<div
					className="w-100 mx-0"
					style={{
						display: "grid",
						gridTemplateColumns: "3fr 1fr 1fr 2fr",
						gridTemplateRows: "4rem",
						gap: "0 4rem"
					}}
				>
					<div>
						<div className="inline coursetitle">
							<h1 className="titlefont mb-0">{course.courseID}</h1>
							{isSaved ? (
								<Icon
									name="unsave"
									alt="unsave course"
									iconclass="unsaveIcon iconfilter"
									onClick={() => dispatch(removeCourse(course.courseID))}
								/>
							) : (
								<Icon
									name="save"
									alt="save course"
									iconclass="saveIcon iconfilter"
									onClick={() => dispatch(saveCourse(course.courseID))}
								/>
							)}
						</div>
						<h4 className="subtitlefont mb-0" style = {{marginTop: ".75rem"}}>{course.name}</h4>
					</div>
					<div
						className="infowrapper"
						style = {{
							display: "grid",
							gridTemplateColumns: "max-content max-content",
							gap: "0 12px",
							gridTemplateRows: "1fr 1fr 1fr"
						}}
					>
						<div className="sectionlabelfont" style={{gridArea: "1 / 1 / 1 / 2"}}>Statistics</div>
						<div style={{whiteSpace: "nowrap", gridArea: "2 / 1 / 2 / 1"}} className="inline contentfont">
							<Icon
								name="enrollment"
								alt="enrollment icon"
								width="11px"
								iconclass="d-inline-block mr-1 iconfilter"
							/>
							<div style={{color: enrollmentColor, fontWeight: "500"}} className="d-inline-block">
								{course.enrollment.current}/{course.enrollment.max}
							</div>
						</div>
						<div style={{whiteSpace: "nowrap", gridArea: "3 / 1 / 3 / 1"}} className="inline contentfont">
							<Icon
								name="grades"
								alt="grade icon"
								width="11px"
								iconclass="d-inline-block mr-1 iconfilter"
							/>
							<div style={{color: gradeColor, fontWeight: "500"}} className="d-inline-block">
								{course.grade === -1 ? <span style={{fontWeight: "300"}}>N/A</span> : <>{lettergrade} ({course.grade})</>}
							</div>
						</div>
						<div style={{whiteSpace: "nowrap", gridArea: "2 / 2 / 2 / 2"}} className="inline contentfont">
							<Icon
								name="credits"
								alt="credits icon"
								width="11px"
								iconclass="d-inline-block mr-1 iconfilter"
							/>
							<div className="d-inline-block secondarytextcolor">
								{course.credits} credit
								{course.credits !== 1 && "s"}
              </div>
            </div>
            <div style={{ whiteSpace: "nowrap", gridArea: "3 / 2 / 3 / 2" }} className="inline contentfont">
              <Icon
                name="section"
                alt="sections icon"
                width="11px"
                iconclass="d-inline-block mr-1 iconfilter"
              />
              <div className="d-inline-block secondarytextcolor">
                {Object.keys(course.sections).length} section
								{Object.keys(course.sections).length > 1 && "s"}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "max-content 10rem max-content",
              gap: "0 8px",
              gridTemplateRows: "1fr 1fr 1fr",
            }}
            className="contentfont infowrapper"
          >
            <div className="sectionlabelfont" style={{ gridArea: "1 / 1 / 1 / 1" }}>
              Ratings
						</div>

						{/* Quality */}
						<div style={{gridArea: "2 / 1 / 2 / 1"}} >Course</div>
						<div style={{gridArea: "2 / 2 / 2 / 2"}}>
							<RatingBar value={ratingsLoaded && courseRatings.courseEff} highIsBetter={true} />
						</div>
						<div style={{gridArea: "2 / 3 / 2 / 3"}} className="font-italic">{courseRatings.courseEff}/5</div>

						{/* Difficulty */}
						<div style={{gridArea: "3 / 1 / 3 / 1"}} >Instructor</div>
						<div style={{gridArea: "3 / 2 / 3 / 2"}}>
							<RatingBar value={ratingsLoaded && courseRatings.profEff} highIsBetter={true} />
						</div>
						<div style={{gridArea: "3 / 3 / 3 / 3"}} className="font-italic">{courseRatings.profEff}/5</div>
					</div>
				</div>
				<div className="sharedAttr contentfont mt-1">{sharedAttrEle}</div>
				<hr style={{backgroundColor: "var(--labelcolor)", height: 3, borderTop: "none"}} className={" mb-0 " + (sharedAttr.length < 1 ? "mt-3" : "mt-1")}/>
				<div className="hidescroll" style={{height: "calc(100vh - 83px - 90px)", overflowY: "scroll"}}>
				{/* <<<<<<< HEAD */}
					<DescriptionSection title="Description" id="description">{course.description}</DescriptionSection>
					<DescriptionSection title="Prerequisites" id="prerequisites" className={'prereq-wrapper'}>{course.prerequisites}</DescriptionSection>
					<DescriptionSection title="Enrollment Restrictions" id="enrollRestrictions">{course.enrollRestrictions}</DescriptionSection> {/* merge from BS-table branch */}
					<DescriptionSection title="Class Sections" id="class-sections">
								<BootstrapTable
									bootstrap4
									wrapperClasses="table-responsive" 
									keyField='id'
									data={courseSectionData}
									columns={columns}
									selectRow={selectRow}
									headerClasses='sectionlabelfont primarytextcolor'
									rowClasses='contentfont secondarytextcolor'
								/>
					</DescriptionSection>
		  			{/* replace sort icons */}

					{/* <div className="sectionlabelfont mt-2">Description</div>
					<div className="mb-3 contentfont">{course.description}</div>

					<div className="sectionlabelfont">Prerequisites</div>
					<div className="mb-3 prereq-wrapper contentfont">{course.prerequisites}</div>

					<div className="sectionlabelfont">Enrollment Restrictions</div>
					<div className="mb-3">{course.enrollRestrictions}</div>

					<div className="sectionlabelfont">Class Sections</div> 
					<table className="table-responsive">
						<thead>
							<tr className="sectionlabelfont primarytextcolor">
                				<th scope="col"></th>
								<th scope="col">ID</th>
								<th scope="col">CRN</th>
								<th scope="col">Type</th>
								<th scope="col">Enrollment</th>
								<th scope="col">Time</th>
								<th scope="col">Days</th>
								<th scope="col">Location</th>
								<th scope="col">Instructors</th>
								<th scope="col">Grades</th>
								<th scope="col">Ratings</th>
								<th scope="col">Attributes</th>
								{filters.campus.value !== "Any" && <th scope="col">Campus</th>}
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
								var instructorArr = [];
								if (instructors !== "N/A") {
									instructorArr = [];
									meetings[0][4].forEach((instructor, i) => {
										if (instructor.charAt(instructor.length - 1) === " ") {
											instructor = instructor.substr(0, instructor.length - 1);
										}
										instructors += instructor.replace("(P)", "");
										instructorArr.push(instructor);
										if (i !== meetings[0][4].length - 1) instructors += ", ";
									});
								}
								var attributes = "";
								sectionRaw[5].forEach((attribute, index) => {
									if (!sharedAttr.includes(attribute)){
										attributes += caches.attributes[attribute];
										if (index < sectionRaw[5].length - 1) {
											attributes += ", ";
										}
									}
								});
								var grades = ["N/A"];
								if (gradesLoaded && instructorArr && instructorArr[0] !== "TBA") {
									grades = [];
									instructorArr.forEach(instructor => {
										let profName = instructor.split(" (P)")[0];
										grades.push(profGrades[profName] || "N/A");
									});
								}
								var sectionGradeColors = [];
								var sectionGradeLetters = [];
								grades.forEach(grade => {
									sectionGradeColors.push(determineGradeColor(grade));
									sectionGradeLetters.push(determineGradeLetter(grade));
								});
								var secRating = [null, null, null]
								if (secRatingsLoaded) {					
									secRating = secRatings[instructorArr[0]]
									if (typeof secRating !== "undefined") {
										secRating = Object.values(secRating)
									} else {
										secRating = ["N/A", "N/A", "N/A"]
									}
								}

								const section = {
									type: caches.scheduleTypes[sectionRaw[3]],
									courseNumber: sectionRaw[0],
									id: id,
									time: meetings.length > 0 ? caches.periods[meetings[0][0]] : "N/A",
									days: meetings.length > 0 && meetings[0][1] !== "&nbsp;" ? meetings[0][1] : "N/A",
									location: meetings.length > 0 ? meetings[0][2] : "N/A",
									campus: caches.campuses[sectionRaw[4]]
								};

								return (
									<tr key={section.id} className="contentfont secondarytextcolor">
										<td>
										<input type="checkbox" 
											onChange={() => dispatch(toggleSection({[selectedCourse]: section.id}))}
											checked={savedCourses[selectedCourse] !== undefined && savedCourses[selectedCourse][section.id] !== undefined}/>
										</td>
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
																{typeof(grade) === "number" ? (
																	<>{sectionGradeLetters[i]} ({grade})</>
																):(
																	grade
																)}
															</span>
															{i < grades.length - 1 && <>, </>}
														</>
													);
												})
											) : (
												<BeatLoader size={8} margin={0} color="var(--secondarytextcolor)" />
												// <>Loading...</>
											)}
										</td>
										<td style = {{whiteSpace: "nowrap"}}>
											{secRatingsLoaded ? (
												secRating.map((entry, i) => {
													return (
														<>
															<span
																style = {{color: i !== 2 && typeof entry !== "string" ? determineRatingColor(entry, 5, true):"var(--secondarytextcolor)"}}
															>
																{entry}
															</span>
															{i < secRating.length - 1 && <>, </>}
														</>
													)											
													})
												) : (
													<BeatLoader size={8} margin={0} color="var(--secondarytextcolor)" />
													// <>Loading...</>
												)
											}
										</td>
										<td>{attributes}</td>
										{filters.campus.value !== "Any" && <td>{section.campus}</td>}
									</tr>
								);
							})}
						</tbody>
					</table>*/}
					{/* >>>>>>> ratings */}
				</div>
				{alertmsg}
			</div>
		</>
	);
}

export default CourseInfo;
