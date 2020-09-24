import {UPDATE_SELECTED_COURSE} from "./actions";

const initialState = {
	selectedCourse: 0
};

export default function (state = initialState, action) {
	switch (action.type) {
		case UPDATE_SELECTED_COURSE:
			return {
				...state,
				selectedCourse: action.selectedCourse
			};
		default:
			return state;
	}
}
