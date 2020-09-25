import {configureStore} from "@reduxjs/toolkit";
import catalogReducer from "./catalogSlice";

export default configureStore({
	reducer: {
		catalog: catalogReducer
	}
});
