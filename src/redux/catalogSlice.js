import {createSlice} from "@reduxjs/toolkit";

export const catalogSlice = createSlice({
	name: "catalog",
	initialState: {
		selectedCourse: 0
	},
	reducers: {
		updateSelectedCourse: (state, action) => {
			state.selectedCourse = action.payload;
		}
	}
});

export const {updateSelectedCourse} = catalogSlice.actions;

export const getSelectedCourse = state => state.catalog.selectedCourse;

export default catalogSlice.reducer;
