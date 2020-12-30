import React from "react";
import {useSelector} from "react-redux";
import {getFilters, getSavedCourses, getSearchQuery, getSort} from "../../redux/courseListSlice";
import {FixedSizeList as List} from "react-window";
import {useWindowWidth} from "@react-hook/window-size";
import AutoSizer from "react-virtualized-auto-sizer";
import courses from "../../scripts/courses";
import CourseListItem from "./CourseListItem";
import SavedCourses from "./SavedCourses";
import {caches} from "../../scripts/courses";
import "../../css/CourseList.css";
import $ from "jquery";

import Icon from "../../img/icon";

/** Keys are the courseID values. Values are the long names */
export const subjectNames = {
	ACCT: "Accounting",
	AE: "Aerospace Engineering",
	AS: "Air Force Aerospace Studies",
	APPH: "Applied Physiology",
	ASE: "Applied Systems Engineering",
	ARBC: "Arabic",
	ARCH: "Architecture",
	BIOS: "Biological Sciences",
	BIOL: "Biology",
	BMEJ: "Biomed Engr/Joint Emory PKU",
	BMED: "Biomedical Engineering",
	BC: "Building Construction",
	BCP: "Building Construction - Professional",
	CETL: "Center Enhancement - Teach/Learn",
	CHBE: "Chemical & Biomolecular Engr (CHBE)",
	CHEM: "Chemistry",
	CHIN: "Chinese",
	CP: "City Planning",
	CEE: "Civil and Environmental Engr",
	COA: "College of Architecture",
	COE: "College of Engineering",
	COS: "College of Sciences",
	CX: "Computational Mod, Sim, & Data",
	CSE: "Computational Science & Engr",
	CS: "Computer Science",
	COOP: "Cooperative Work Assignment",
	UCGA: "Cross Enrollment",
	EAS: "Earth and Atmospheric Sciences",
	ECON: "Economics",
	ECEP: "Elect & Comp Engr - Professional",
	ECE: "Electrical & Computer Engineering",
	ENGL: "English",
	FS: "Foreign Studies",
	FREE: "Free Elective",
	FREN: "French",
	GT: "Georgia Tech",
	GTL: "Georgia Tech Lorraine",
	GRMN: "German",
	HP: "Health Physics",
	HS: "Health Systems",
	HEBW: "Hebrew",
	HIN: "Hindi",
	HIST: "History",
	HTS: "History, Technology, & Society",
	HUM: "Humanities Elective",
	ID: "Industrial Design",
	ISYE: "Industrial & Systems Engr",
	INTA: "International Affairs",
	IL: "International Logistics",
	INTN: "Internship",
	IMBA: "Intl Executive MBA",
	IPCO: "Int'l Plan Co-op Abroad",
	IPFS: "Int'l Plan-Exchange Prgm",
	IPIN: "Int'l Plan Intern Abroad",
	IPSA: "Int'l Plan-Study Abroad",
	IAC: "Ivan Allen College",
	JAPN: "Japanese",
	KOR: "Korean",
	LATN: "Latin",
	LS: "Learning Support",
	LING: "Linguistics",
	LMC: "Literature, Media & Comm",
	MGT: "Management",
	MOT: "Management of Technology",
	MLDR: "Manufacturing Leadership",
	MSE: "Materials Science & Engr",
	MATH: "Mathematics",
	ME: "Mechanical Engineering",
	MP: "Medical Physics",
	MSL: "Military Science & Leadership",
	ML: "Modern Languages",
	MUSI: "Music",
	NS: "Naval Science",
	NEUR: "Neuroscience",
	NRE: "Nuclear & Radiological Engr",
	PERS: "Persian",
	PHIL: "Philosophy",
	PHYS: "Physics",
	POL: "Political Science",
	PTFE: "Polymer, Textile and Fiber Eng",
	DOPP: "Professional Practive",
	PSYC: "Psychology",
	PUBJ: "Public Policy/Joint GSU PhD",
	PUBP: "Public Policy",
	RUSS: "Russian",
	SCI: "Science",
	SLS: "Serve Learn Sustain",
	SS: "Social Science Elective",
	SOC: "Sociology",
	SPAN: "Spanish",
	SWAH: "Swahili"
};

var filteredCourses = null;

function CourseList({id}) {
	const filters = useSelector(getFilters);
	const sort = useSelector(getSort).value;
	const savedCourses = useSelector(getSavedCourses);
	const searchQuery = useSelector(getSearchQuery);

	let initCollapsed = JSON.parse(localStorage.getItem('collapsed'));
	const toggleCollapse = () => {
		$("#clistwrapper").toggleClass("savecollapsed");
		localStorage.setItem('collapsed', $("#clistwrapper").hasClass("savecollapsed"));
	};
	if (!(`collapsed` in localStorage)){
		initCollapsed = true;
	}

	filteredCourses = Object.entries(courses)
		.filter(courseRaw => {
			const [courseID, courseData] = courseRaw;
			if (id !== "catalog" && savedCourses[courseID]) {
				return false;
			}
			if (filters.credits && filters.credits.length > 0) {
				const creditFiltersSet = new Set(filters.credits.map(option => parseInt(option.value)));
				// Object.values(courseData[1])[0][2] is the number of course credits listed for the first section
				let credits = Object.values(courseData[1])[0][2];
				if (!creditFiltersSet.has(credits)) return false;
			}
			if (filters.subject && filters.subject.length > 0) {
				const subjectFiltersSet = new Set(filters.subject.map(option => option.value));
				let subject = subjectNames[courseID.split(" ")[0]];
				if (!subjectFiltersSet.has(subject)) return false;
			}
			if (filters.level && filters.level.length > 0) {
				const levelFiltersSet = new Set(filters.level.map(option => parseInt(option.value)));
				let level = parseInt(courseID.split(" ")[1].charAt(0)) * 1000;
				if (!levelFiltersSet.has(level)) return false;
			}
			if (filters.type && filters.type.length > 0) {
				const typeFilters = filters.type.map(option => option.value);
				var courseTypes = new Set();
				Object.values(courseData[1]).forEach(section => {
					// section[3] is the index representing the schedule type of the section
					courseTypes.add(caches["scheduleTypes"][section[3]]);
				});
				for (let i = 0; i < typeFilters.length; i++) {
					if (!courseTypes.has(typeFilters[i])) {
						return false;
					}
				}
			}
			if (filters.campus.value !== "Any") {
				const campusFilter = filters.campus.value;
				const sections = Object.values(courseData[1]);
				let match = false;
				for (let i = 0; i < sections.length; i++) {
					const section = sections[i];
					const campus = caches["campuses"][section[4]];
					if (campus === campusFilter) {
						match = true;
						break;
					}
				}
				if (!match) {
					return false;
				}
			}
			if (filters.instructors && filters.instructors.length > 0) {
				const instructorFiltersSet = new Set(filters.instructors.map(option => option.value));
				const sections = Object.values(courseData[1]);
				var hasInstructor = false;
				for (let i = 0; i < sections.length && !hasInstructor; i++) {
					const section = sections[i];
					const meetings = section[1];
					if (meetings.length > 0) {
						const professors = meetings[0][4];
						for (let p = 0; p < professors.length; p++) {
							if (instructorFiltersSet.has(professors[p])) {
								hasInstructor = true;
								break;
							}
						}
					}
				}
				if (!hasInstructor) {
					return false;
				}
			}
			if (searchQuery !== "") {
				if (
					!courseID.includes(searchQuery.toUpperCase()) &&
					!courseData[0].toUpperCase().includes(searchQuery.toUpperCase())
				) {
					return false;
				}
			}
			return true;
		})
		.sort((a, b) => {
			switch (sort) {
				case "Course ID":
					// a/b[0] is the courseID
					let aSplit = a[0].split(" ");
					let bSplit = b[0].split(" ");
					if (aSplit[0] === bSplit[0]) {
						return parseInt(aSplit[1]) - parseInt(bSplit[1]);
					}
					return aSplit[0].localeCompare(bSplit[0]);
				case "Name":
					// a/b[1][0] is the course name
					return a[1][0].localeCompare(b[1][0]);
				case "Grade":
					const aGrade = a[1][4];
					const bGrade = b[1][4];
					if (!aGrade && !bGrade) return 0;
					if (!aGrade) return 1;
					if (!bGrade) return -1;
					return bGrade - aGrade;
				default:
					return 0;
			}
		});

	const Row = ({index, style}) => {
		const [courseID, courseData] = filteredCourses[index];
		const courseEnrollment = {current: parseInt(courseID.split(" ")[1]) , max: 9999}; //just testing colors
		const course = {
			name: courseData[0],
			enrollment: courseEnrollment,
			grade: courseData[4],
			credits: Object.values(courseData[1])[0][2],
			sections: courseData[1]
		};
		return (
			<CourseListItem
				courseID={courseID}
				name={course.name}
				enrollmentPercent={(courseEnrollment.current / courseEnrollment.max) * 100}
				credits={course.credits}
				numSections={Object.keys(course.sections).length}
				grade={course.grade}
				style={style}
				page={id}
				key={courseID}
			/>
		);
	};

	const windowWidth = useWindowWidth();
	const Prefs = JSON.parse(localStorage.getItem("settings")) || [1,3,2];
	let itemHeight = windowWidth > 1630 ? 60 : 80;
	if (Prefs[0] === 2){
		itemHeight = windowWidth > 1630 ? 70 : 90;
	}

	return (
		<div
			id="clistwrapper"
			className={(initCollapsed ? "savecollapsed" : "")}
			style={{
				height: "calc(100vh - 90px)"
			}}
		>
			<div id="courseList">
				{filteredCourses.length === 0 ? (
					<h2 className="subheadingfont text-center pt-3">Sorry, no classes match set filters <span role="img" aria-label="unhappyface">😔</span></h2>
				) : (
					<AutoSizer>
						{({height, width}) => (
							<List
								height={height}
								itemCount={filteredCourses.length}
								itemSize={itemHeight}
								width={width}
								className="customhoverscroll"
							>
								{Row}
							</List>
						)}
					</AutoSizer>
				)}
			</div>

			<div
				id = "savedCoursesheader"
				className="sectionlabelfont inline justify-content-between px-2 mt-2 mb-1 "
				onClick={toggleCollapse}
			>
				Saved Courses

				<Icon
					name="collapse"
					alt="collapse"
					iconclass="iconfilter"
				/>
			</div>
			<div id="savedCourses">
				<SavedCourses />
			</div>
		</div>
	);
}

export default CourseList;
