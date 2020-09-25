import {createSlice} from "@reduxjs/toolkit";
import courses from "../components/catalog/courses";

export const catalogSlice = createSlice({
	name: "catalog",
	initialState: {
		selectedCourse: 0,
		filters: {},
		sort: "Course ID",
		courses: courses
	},
	reducers: {
		updateSelectedCourse: (state, action) => {
			state.selectedCourse = action.payload;
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
		},
		updateCourses: (state, action) => {
			if (state.selectedCourse >= action.payload.length)
				state.selectedCourse = action.payload.length - 1;
			state.courses = action.payload;
		}
	}
});

export const {
	updateSelectedCourse,
	updateFilter,
	resetFilters,
	updateSort,
	updateCourses
} = catalogSlice.actions;

export const getSelectedCourse = state => state.catalog.selectedCourse;
export const getFilters = state => state.catalog.filters;
export const getSort = state => state.catalog.sort;
export const getCourses = state => state.catalog.courses;

export default catalogSlice.reducer;
