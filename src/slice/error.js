import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
	name: "error",
	initialState: { message: null },
	reducers: {
		setError: (state, action) => {
			state.message = action.payload;
		},
		clearError: (state) => {
			state.message = null;
		},
	},
});
export const selectErrorMessage = (state) => state.errorSlice.message;

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
