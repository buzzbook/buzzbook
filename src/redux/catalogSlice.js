import {createSlice} from "@reduxjs/toolkit";

export const catalogSlice = createSlice({
	name: "catalog",
	initialState: {
		selectedCourse: 0,
		filters: {
			credits: "Any",
			subject: "Any",
			level: "Any"
		}
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
		}
	}
});

export const {
	updateSelectedCourse,
	updateFilter,
	resetFilters
} = catalogSlice.actions;

export const getSelectedCourse = state => state.catalog.selectedCourse;
export const getFilters = state => state.catalog.filters;

export default catalogSlice.reducer;
