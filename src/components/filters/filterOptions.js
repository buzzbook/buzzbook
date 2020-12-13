import {instructors, caches} from "../../scripts/courses";
import {subjectNames} from "../courseList/CourseList";

export const sortBy = ["Course ID", "Name", "Grade"];
export const subjects = Object.values(subjectNames).map(name => {
	return name;
});
export const levels = [1000, 2000, 3000, 4000, 6000, 7000, 8000, 9000];
export const credits = [0, 1, 2, 3, 4, 5, 6, 9];
export const types = caches["scheduleTypes"];
export const instructorList = instructors;
export const campuses = ["Any"].concat(caches["campuses"]);
