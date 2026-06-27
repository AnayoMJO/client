import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserById, updateUserById } from "../api/user";

const initialState = {
	status: "idle",
	userInfo: null,
	errors: null,
	successMessage: null,
};

export const fetchLoggedInUserByIdAsync = createAsyncThunk(
	"user/fetchLoggedInUserByIdAsyn",
	async (id) => {
		const userInfo = await fetchLoggedInUserById(id);
		return userInfo;
	}
);

export const updateUserByIdAsync = createAsyncThunk(
	"user/updateUserByIdAsync",
	async (update) => {
		const updatedUser = await updateUserById(update);
		return updatedUser;
	}
);

const userSlice = createSlice({
	name: "userSlice",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLoggedInUserByIdAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(fetchLoggedInUserByIdAsync.fulfilled, (state, action) => {
				state.status = "fulfilled";
				state.userInfo = action.payload;
			})
			.addCase(fetchLoggedInUserByIdAsync.rejected, (state, action) => {
				state.status = "rejection";
				state.errors = action.error;
			})
			.addCase(updateUserByIdAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(updateUserByIdAsync.fulfilled, (state, action) => {
				state.status = "fulfilled";
				state.userInfo = action.payload;
			})
			.addCase(updateUserByIdAsync.rejected, (state, action) => {
				state.status = "rejected";
				state.errors = action.error;
			});
	},
});

export const selectUserStatus = (state) => state.userSlice.status;
export const selectUserInfo = (state) => state.userSlice.userInfo;
export const selectUserErrors = (state) => state.userSlice.errors;
export const selectUserSuccessMessage = (state) =>
	state.userSlice.successMessage;

export default userSlice.reducer;
