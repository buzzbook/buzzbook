import data from "./sp21_testdata.json";
console.log(data);

/*
courses = [name, sections, prereqs, descriptions]
sections = [CRN, meetings, credits, scheduleTypes index, campuses index, attributes indices, gradeBases index]
meetings = [periods index, days, room, locations index, instructors, dateRange index] 
indeces refer to the caches
*/

var localStorage = window.localStorage;
localStorage.setItem("courses", JSON.stringify(data.courses));

export default data.caches;
