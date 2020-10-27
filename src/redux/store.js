import {configureStore} from "@reduxjs/toolkit";
import courseListReducer from "./courseListSlice";

export default configureStore({
	reducer: {
		courseList: courseListReducer
	}
});
