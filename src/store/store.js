import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/user";
import addressSlice from "../slice/address";
import authSlice from "../slice/auth";
import productSlice from "../slice/product";
import brandSlice from "../slice/brand";
import categoriesSlice from "../slice/categories";
import reviewSlice from "../slice/review";
import orderSlice from "../slice/order";
import wishlistSlice from "../slice/wishlist";
import cartSlice from "../slice/cart";
import errorSlice from "../slice/error";
//import authReducer from "../testSlice";

export const store = configureStore({
	reducer: {
		userSlice,
		addressSlice,
		authSlice,
		productSlice,
		brandSlice,
		categoriesSlice,
		reviewSlice,
		orderSlice,
		wishlistSlice,
		cartSlice,
		errorSlice,
		//auth: authReducer,
	},
});
