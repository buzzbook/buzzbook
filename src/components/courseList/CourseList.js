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
	var savedCourses = useSelector(getSavedCourses);
	const filteredCourses = Object.entries(courses)
		.filter(courseRaw => {
			const [courseID, courseData] = courseRaw;
			if (id !== "catalog" && savedCourses[courseID]) {
				return false;
			}
			// Object.values(courseData[1])[0][2] is the number of course credits
			if (filters.credits && filters.credits.length > 0) {
				const creditFilterBy = filters.credits.map(option => option.value);
				if (!creditFilterBy.includes("Any")) {
					if (!creditFilterBy.includes(Object.values(courseData[1])[0][2]))
						return false;
				}
			}
			if (filters.subject && filters.subject.length > 0) {
				const subjectFilterBy = filters.subject.map(option => option.value);
				if (!subjectFilterBy.includes("Any")) {
					let subject = subjectNames[courseID.split(" ")[0]];
					if (!subjectFilterBy.includes(subject)) return false;
				}
			}
			if (filters.level && filters.level.length > 0) {
				const levelFilterBy = filters.level.map(option => option.value);
				if (!levelFilterBy.includes("Any")) {
					let level = parseInt(courseID.split(" ")[1].charAt(0)) * 1000;
					if (!levelFilterBy.includes(level)) return false;
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
							const [courseID, courseData] = courseRaw;
							const courseEnrollment = {current: 200, max: 250};
							const courseGrade = "A";
							const course = {
								name: courseData[0],
								enrollment: courseEnrollment,
								grade: courseGrade,
								credits: Object.values(courseData[1])[0][2],
								sections: courseData[1]
							};

							return (
								<CourseListItem
									courseID={courseID}
									name={course.name}
									enrollmentPercent={
										(courseEnrollment.current / courseEnrollment.max) * 100
									}
									credits={course.credits}
									numSections={Object.keys(course.sections).length}
									grade={course.grade}
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
