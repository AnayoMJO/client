import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllCategories } from "../api/categories";

const initialState = {
	status: "idle",
	categories: [],
	errors: null,
};

export const fetchAllCategoriesAsync = createAsyncThunk(
	"categories/fetchAllCategoriesAsync",
	async () => {
		const categories = await fetchAllCategories();
		console.log("categories:", categories);
		return categories;
	}
);

const categorySlice = createSlice({
	name: "categorySlice",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllCategoriesAsync.pending, (state) => {
				state.status = "idle";
			})
			.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
				state.status = "fulfilled";
				state.categories = action.payload;
			})
			.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
				state.status = "rejected";
				state.errors = action.error;
			});
	},
});

export const selectCategoryStatus = (state) => state.categoriesSlice.status;
export const selectCategories = (state) => state.categoriesSlice.categories;
export const selectCategoryErrors = (state) => state.categoriesSlice.errors;

export default categorySlice.reducer;
