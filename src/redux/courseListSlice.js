import {createSlice} from "@reduxjs/toolkit";
import courses from "../courses";

var startID = Object.keys(courses)[0];
let path = window.location.href.split("/");
if (path.length === 5) {
	let iDParts = path[4].split("+");
	let currID = iDParts[0] + " " + iDParts[1];
	currID = currID.toUpperCase();
	if (currID !== startID) {
		if (courses[currID]) {
			// Will only update starting course to match URL if it's a valid course
			startID = currID;
		}
	}
}

export const courseListSlice = createSlice({
	name: "courseList",
	initialState: {
		selectedCourse: startID,
		// Saved courses is an object full of courseID: true entries
		// This is because searching an object is O(1) vs O(n) for an array
		savedCourses: {},
		filters: {},
		sort: {value: "Course ID", label: "Course ID"},
		searchQuery: ""
	},
	reducers: {
		updateSelectedCourse: (state, action) => {
			state.selectedCourse = action.payload;
		},
		/** Adds a course by its course ID */
		saveCourse: (state, action) => {
			state.savedCourses[action.payload] = true;
		},
		/** Removes a course by its course ID */
		removeCourse: (state, action) => {
			delete state.savedCourses[action.payload];
		},
		updateFilter: (state, action) => {
			state.filters[action.payload.name] = action.payload.value;
		},
		resetFilters: state => {
			state.filters = {};
		},
		updateSort: (state, action) => {
			state.sort = action.payload;
		},
		updateSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		}
	}
});

export const {
	updateSelectedCourse,
	saveCourse,
	removeCourse,
	updateFilter,
	resetFilters,
	updateSort,
	updateSearchQuery
} = courseListSlice.actions;

export const getSelectedCourse = state => state.courseList.selectedCourse;
export const getSavedCourses = state => state.courseList.savedCourses;
export const getFilters = state => state.courseList.filters;
export const getSort = state => state.courseList.sort;
export const getSearchQuery = state => state.courseList.searchQuery;

export default courseListSlice.reducer;
