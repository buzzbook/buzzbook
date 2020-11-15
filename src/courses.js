import data from "./sp21_testdata.json";
console.log(data);

/*
courses = [name, sections, prereqs, descriptions]
sections = [CRN, meetings, credits, scheduleTypes index, campuses index, attributes indices, gradeBases index]
meetings = [periods index, days, room, locations index, instructors, dateRange index] 
indeces refer to the caches
*/

var courses = [];
var index = 0;
for (const [course, info] of Object.entries(data.courses)) {
	info.push(course);
	info.push(index++);
	courses.push(info);
}

console.log(courses);

var localStorage = window.localStorage;
localStorage.setItem("courses", JSON.stringify(courses));

export default data.caches;
