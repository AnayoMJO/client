import { useEffect } from "react";
import { checkAuthAsync } from "../slice/auth";
import { useDispatch } from "react-redux";

export const useAuthCheck = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuthAsync());
	}, [dispatch]);
};
