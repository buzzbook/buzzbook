import {createSlice} from "@reduxjs/toolkit";

const courses = JSON.parse(window.localStorage.getItem("courses"));

export const catalogSlice = createSlice({
	name: "catalog",
	initialState: {
		selectedCourse: 0,
		filters: {},
		sort: "Course ID",
		filteredCourses: courses
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
		updateFilteredCourses: (state, action) => {
			if (state.selectedCourse >= action.payload.length)
				state.selectedCourse = action.payload.length - 1;
			else if (state.selectedCourse === -1 && action.payload.length > 0)
				state.selectedCourse = 0;
			state.filteredCourses = action.payload;
		}
	}
});

export const {
	updateSelectedCourse,
	updateFilter,
	resetFilters,
	updateSort,
	updateFilteredCourses
} = catalogSlice.actions;

export const getSelectedCourse = state => state.catalog.selectedCourse;
export const getFilters = state => state.catalog.filters;
export const getSort = state => state.catalog.sort;
export const getFilteredCourses = state => state.catalog.filteredCourses;

export default catalogSlice.reducer;
