import {createSlice} from "@reduxjs/toolkit";

const courses = JSON.parse(window.localStorage.getItem("courses"));

export const courseListSlice = createSlice({
	name: "courseList",
	initialState: {
		selectedCourse: 0,
		savedCourses: [],
		filters: {term: null, credits: null, subject: null, level: null, core: null, prof: null},
		sort: {value: "Course ID", label: "Course ID"},
		filteredCourses: courses
	},
	reducers: {
		updateSelectedCourse: (state, action) => {
			state.selectedCourse = action.payload;
		},
		/** Adds a course by its index in the courses list */
		saveCourse: (state, action) => {
			state.savedCourses.push(action.payload);
		},
		/** Removes a course by its index in the saved courses list */
		removeCourse: (state, action) => {
			state.savedCourses.splice(action.payload, 1);
		},
		/** Removes a course by its index in the courses list */
		removeCourseByIndex: (state, action) => {
			let index = state.savedCourses.indexOf(action.payload);
			state.savedCourses.splice(index, 1);
		},
		updateFilter: (state, action) => {
			state.filters[action.payload.name] = action.payload.value;
		},
		resetFilters: state => {
      state.filters = {term: null, credits: null, subject: null, level: null, core: null, prof: null};
		},
		updateFilteredCourses: (state, action) => {
			if (state.selectedCourse >= action.payload.length)
				state.selectedCourse = action.payload.length - 1;
			else if (state.selectedCourse === -1 && action.payload.length > 0)
				state.selectedCourse = 0;
			state.filteredCourses = action.payload;
		},
		updateSort: (state, action) => {
			state.sort = action.payload;
		}
	}
});

export const {
	updateSelectedCourse,
	saveCourse,
	removeCourse,
	removeCourseByIndex,
	updateFilter,
	resetFilters,
	updateFilteredCourses,
	updateSort
} = courseListSlice.actions;

export const getSelectedCourse = state => state.courseList.selectedCourse;
export const getSavedCourses = state => state.courseList.savedCourses;
export const getFilters = state => state.courseList.filters;
export const getSort = state => state.courseList.sort;
export const getFilteredCourses = state => state.courseList.filteredCourses;

export default courseListSlice.reducer;
