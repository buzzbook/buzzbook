export const UPDATE_SELECTED_COURSE = "UPDATE_SELECTED_COURSE";

export function updateSelectedCourse(dispatch, newValue) {
	dispatch({
		type: UPDATE_SELECTED_COURSE,
		selectedCourse: newValue
	});
}
