import {
	FormHelperText,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearOtpVerificationError,
	clearResendOtpError,
	clearResendOtpSuccessMessage,
	resendOtpAsync,
	resetOtpVerificationStatus,
	resetResendOtpStatus,
	selectLoggedInUser,
	selectOtpVerificationError,
	selectOtpVerificationStatus,
	selectResendOtpError,
	selectResendOtpStatus,
	selectResendOtpSuccessMessage,
	verifyOtpAsync,
} from "../slice/auth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const OtpVerfication = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const loggedInUser = useSelector(selectLoggedInUser);
	const navigate = useNavigate();
	const resendOtpStatus = useSelector(selectResendOtpStatus);
	const resendOtpError = useSelector(selectResendOtpError);
	const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
	const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
	const otpVerificationError = useSelector(selectOtpVerificationError);

	useEffect(() => {
		if (!loggedInUser) {
			navigate("/login");
		} else if (loggedInUser && loggedInUser?.isVerified) {
			navigate("/");
		}
	}, [loggedInUser, navigate]);

	const handleSendOtp = () => {
		const data = { email: loggedInUser?.email };
		dispatch(resendOtpAsync(data));
	};

	const handleVerifyOtp = (data) => {
		const cred = { ...data, email: loggedInUser?.email };
		dispatch(verifyOtpAsync(cred));
	};

	useEffect(() => {
		if (resendOtpError) {
			toast.error(resendOtpError);
		}
		return () => {
			dispatch(clearResendOtpError());
		};
	}, [resendOtpError, dispatch]);

	useEffect(() => {
		if (resendOtpSuccessMessage) {
			toast.success(resendOtpSuccessMessage);
		}
		return () => {
			dispatch(clearResendOtpSuccessMessage());
		};
	}, [resendOtpSuccessMessage, dispatch]);

	useEffect(() => {
		if (otpVerificationError) {
			toast.error(otpVerificationError);
		}
		return () => {
			dispatch(clearOtpVerificationError());
		};
	}, [otpVerificationError, dispatch]);

	useEffect(() => {
		if (otpVerificationStatus === "fullfilled") {
			toast.success("Email verified! We are happy to have you here");
			dispatch(resetResendOtpStatus());
		}
		return () => {
			dispatch(resetOtpVerificationStatus());
		};
	}, [otpVerificationStatus, dispatch]);

	return (
		<Stack
			width={"100vw"}
			height={"100vh"}
			noValidate
			flexDirection={"column"}
			rowgap={3}
			justifyContent="center"
			alignItems="center">
			<Stack
				component={Paper}
				elevation={1}
				position={"relative"}
				justifyContent={"center"}
				alignItems={"center"}
				p={"2rem"}
				rowGap={"2rem"}>
				<Typography mt={4} variant="h5" fontWeight={500} gutterBottom>
					Verify Your Email Address
				</Typography>

				{resendOtpStatus === "fullfilled" ? (
					<form
						width={"100%"}
						rowGap={"1rem"}
						component={"form"}
						noValidate
						onSubmit={handleSubmit(handleVerifyOtp)}>
						<Stack rowGap={"1rem"}>
							<Stack>
								<Typography color={"GrayText"}>
									Enter the 4 digit OTP sent on
								</Typography>
								<Typography fontWeight={"600"} color={"GrayText"}>
									{loggedInUser?.email}
								</Typography>
							</Stack>
							<Stack>
								<TextField
									{...register("otp", {
										required: "OTP is required",
										minLength: {
											value: 4,
											message: "Please enter a 4 digit OTP",
										},
									})}
									fullWidth
									type="number"
								/>
								{errors?.otp && (
									<FormHelperText sx={{ color: "red" }}>
										{errors.otp.message}
									</FormHelperText>
								)}
							</Stack>
						</Stack>
						<Button
							loading={otpVerificationStatus === "pending"}
							type="submit"
							fullWidth
							variant="contained">
							Verify
						</Button>
					</form>
				) : (
					<>
						<Stack>
							<Typography color={"GrayText"}>
								We will send you an OTP on your Email
							</Typography>
							<Typography fontWeight={"600"} color={"GrayText"}>
								{loggedInUser?.email}
							</Typography>
						</Stack>
						<Button
							onClick={handleSendOtp}
							loading={resendOtpStatus === "pending"}
							fullWidth
							variant="contained">
							Get OTP
						</Button>
					</>
				)}
			</Stack>
		</Stack>
	);
};
