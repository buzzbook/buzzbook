import {createSlice} from "@reduxjs/toolkit";

export const courseListSlice = createSlice({
	name: "courseList",
	initialState: {
		selectedCourses: [],
		filters: {},
		sort: "Course ID"
	},
	reducers: {
		/** Adds a course by its index in the courses list */
		addCourse: (state, action) => {
			state.selectedCourses.push(action.payload);
		},
		/** Removes a course by its index in the courses list */
		removeCourse: (state, action) => {
			state.selectedCourses.splice(action.payload, 1);
		},
		updateFilter: (state, action) => {
			state.filters[action.payload.name] = action.payload.value;
		},
		resetFilters: state => {
			var keys = Object.keys(state.filters);
			keys.forEach(function (key) {
				state.filters[key] = "Any";
			});
		},
		updateSort: (state, action) => {
			state.sort = action.payload;
		}
	}
});

export const {
	addCourse,
	removeCourse,
	updateFilter,
	resetFilters,
	updateSort
} = courseListSlice.actions;

export const getSelectedCourses = state => state.grades.selectedCourses;
export const getFilters = state => state.grades.filters;
export const getSort = state => state.grades.sort;

export default courseListSlice.reducer;
