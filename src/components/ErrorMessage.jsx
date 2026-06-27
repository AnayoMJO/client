import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { clearError } from "../slice/error";
import { selectErrorMessage } from "../slice/error";

const ErrorMessage = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(selectErrorMessage);

	return (
		<Snackbar
			open={!!errorMessage}
			autoHideDuration={5000}
			onClick={() => dispatch(clearError)}>
			<Alert severity="error" onClose={() => dispatch(clearError)}>
				{errorMessage}
			</Alert>
		</Snackbar>
	);
};

export default ErrorMessage;
