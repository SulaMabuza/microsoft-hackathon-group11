import { configureStore } from '@reduxjs/toolkit';
import basketReducer from "./features/basketSlice";
import facilityReducer from "./features/facilitySlice";

export const store = configureStore({
	reducer: {
		basket: basketReducer,
		facility: facilityReducer,
	},
});