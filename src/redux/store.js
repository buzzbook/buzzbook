import {configureStore} from "@reduxjs/toolkit";
import catalogReducer from "./catalogSlice";
import gradesReducer from "./courseListSlice";

export default configureStore({
	reducer: {
		catalog: catalogReducer,
		grades: gradesReducer
	}
});
