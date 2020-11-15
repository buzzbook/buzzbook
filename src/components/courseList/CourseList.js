import React from "react";
import {useSelector} from "react-redux";
import {
	getFilters,
	getSavedCourses,
	getSort
} from "../../redux/courseListSlice";
import CourseListItem from "./CourseListItem";
import SavedCourses from "./SavedCourses";
import "../../css/CourseList.css";

const courses = JSON.parse(window.localStorage.getItem("courses"));

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

function CourseList({id}) {
	const filters = useSelector(getFilters);
	const sort = useSelector(getSort).value;
	var savedCoursesIndeces = useSelector(getSavedCourses);
	const filteredCourses = courses
		.filter(courseRaw => {
			// courseRaw[5] is the course index
			if (id !== "catalog" && savedCoursesIndeces.includes(courseRaw[5])) {
				return false;
			}
			// Object.values(courseRaw[1])[0][2] is the number of course credits
			if (filters.credits && filters.credits.length > 0) {
				const creditFilterBy = filters.credits.map(option => option.value);
				if (!creditFilterBy.includes("Any")) {
					if (!creditFilterBy.includes(Object.values(courseRaw[1])[0][2]))
						return false;
				}
			}
			// courseRaw[4] is the courseID
			if (filters.subject && filters.subject.length > 0) {
				const subjectFilterBy = filters.subject.map(option => option.value);
				if (!subjectFilterBy.includes("Any")) {
					let subject = subjectNames[courseRaw[4].split(" ")[0]];
					if (!subjectFilterBy.includes(subject)) return false;
				}
			}
			if (filters.level && filters.level.length > 0) {
				const levelFilterBy = filters.level.map(option => option.value);
				if (!levelFilterBy.includes("Any")) {
					let level = parseInt(courseRaw[4].split(" ")[1].charAt(0)) * 1000;
					if (!levelFilterBy.includes(level)) return false;
				}
			}
			return true;
		})
		.sort((a, b) => {
			switch (sort) {
				case "Course ID":
					// a/b[4] is the courseID
					let aSplit = a[4].split(" ");
					let bSplit = b[4].split(" ");
					if (aSplit[0] === bSplit[0]) {
						return parseInt(aSplit[1]) - parseInt(bSplit[1]);
					}
					return aSplit[0].localeCompare(bSplit[0]);
				case "Name":
					// a/b[0] is the course name
					return a[0].localeCompare(b[0]);
				case "Grade":
				/* if (a.grade.charAt(0) === b.grade.charAt(0)) {
						let modifiers = {
							"+": 0,
							"": 1,
							"-": 2
						};
						return modifiers[a.grade.charAt(1)] - modifiers[b.grade.charAt(1)];
					}
					return a.grade.charAt(0).localeCompare(b.grade.charAt(0)); */
				// No grade data currently
				case "Difficulty":
				// return a.ratings.difficulty - b.ratings.difficulty;
				// No difficulty data currently
				case "Enrollment":
				/* let aPercent = a.enrollment.current / a.enrollment.max;
					let bPercent = b.enrollment.current / b.enrollment.max;
					return aPercent - bPercent; */
				// No enrollment data currently
				default:
					return 0;
			}
		});

	return (
		<div>
			<div style={{height: "100%"}}>
				<div id="courseList">
					{filteredCourses.length === 0 ? (
						<div className="text-center mt-2">
							<h2>No classes match your filters :(</h2>
						</div>
					) : (
						filteredCourses.map((courseRaw, index) => {
							const courseEnrollment = {current: 200, max: 250};
							const courseGrade = "A";
							const course = {
								courseID: courseRaw[4],
								name: courseRaw[0],
								enrollment: courseEnrollment,
								grade: courseGrade,
								credits: Object.values(courseRaw[1])[0][2],
								sections: courseRaw[1],
								index: courseRaw[5]
							};

							return (
								<CourseListItem
									courseID={course.courseID}
									name={course.name}
									enrollmentPercent={
										(courseEnrollment.current / courseEnrollment.max) * 100
									}
									credits={course.credits}
									numSections={Object.keys(course.sections).length}
									grade={course.grade}
									index={course.index}
									key={index}
								/>
							);
						})
					)}
				</div>

				<div
					className="gt-gold font-weight-bold pl-2 mt-2"
					style={{fontSize: "1.25rem"}}
				>
					Saved Courses
				</div>
				<div id="savedCourses">
					<SavedCourses />
				</div>
			</div>
		</div>
	);
}

export default CourseList;
