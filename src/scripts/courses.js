import data from "../f21grades.json";
console.log(data);

/*
courses = [name, sections, prereqs, descriptions]
sections = [CRN, meetings, credits, scheduleTypes index, campuses index, attributes indices, gradeBases index]
meetings = [periods index, days, room, locations index, instructors, dateRange index]
indeces refer to the caches
*/

var localStorage = window.localStorage;
localStorage.setItem("courses", JSON.stringify(data.courses));

var professors = new Set();
Object.values(data.courses).forEach(course => {
	Object.values(course[1]).forEach(section => {
		const meetings = section[1];
		if (meetings.length > 0) {
			meetings[0][4].forEach((instructor, i) => {
				professors.add(instructor);
			});
		}
	});
});
export const instructors = professors;

export const caches = data.caches;
export default data.courses;
