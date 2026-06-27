import { useEffect } from "react";
import { selectLoggedInUser } from "../slice/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressByUserIdAsync } from "../slice/address";
import { fetchWishlistByUserIdAsync } from "../slice/wishlist";
import { fetchCartByUserIdAsync } from "../slice/cart";
import { fetchAllCategoriesAsync } from "../slice/categories";
import { fetchAllBrandsAsync } from "../slice/brand";
import { fetchLoggedInUserByIdAsync } from "../slice/user";

export const useFetchLoggedInUserDetails = (deps) => {
	const loggedInUser = useSelector(selectLoggedInUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (deps && loggedInUser?.isVerified) {
			dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id));
			dispatch(fetchAllBrandsAsync());
			dispatch(fetchAllCategoriesAsync());

			if (!loggedInUser?.isAdmin) {
				dispatch(fetchCartByUserIdAsync(loggedInUser?._id));
				dispatch(fetchAddressByUserIdAsync(loggedInUser?._id));
				dispatch(fetchWishlistByUserIdAsync(loggedInUser?._id));
			}
		}
	}, [
		deps,
		loggedInUser?._id,
		loggedInUser?.isAdmin,
		loggedInUser?.isVerified,
		dispatch,
	]);
};
