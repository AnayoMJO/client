import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../slice/auth";
import { selectLoggedInUser } from "../slice/auth";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
	const dispatch = useDispatch();
	const loggedInUser = useSelector(selectLoggedInUser);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(logoutAsync());
	}, [dispatch]);

	useEffect(() => {
		if (!loggedInUser) {
			navigate("/login");
		}
	}, [loggedInUser, navigate]);

	return <></>;
};
