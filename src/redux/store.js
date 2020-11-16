import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import courseListReducer from "./courseListSlice";

export default configureStore({
	reducer: {
		courseList: courseListReducer
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false
	}),
	devTools: false
});
