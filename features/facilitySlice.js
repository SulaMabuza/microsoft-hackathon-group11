import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	facility: {
		id: null,
		imgUrl: null,
		title: null,
		rating: null,
		genre: null,
		address: null,
		short_description: null,
		vaccines: null,
	}
};

export const facilitySlice = createSlice({
	name: "facility",
	initialState,
	reducers: {
		setFacility: (state, action) => {
			state.facility = action.payload;
		},
	}
});

// Action creators are generated for each case reducer function
export const { setFacility } = facilitySlice.actions;
export const selectFacility = (state) => state.facility.facility;

export default facilitySlice.reducer;
