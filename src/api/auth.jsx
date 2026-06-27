import { Axios } from "../config/axios";

export const signup = async (cred) => {
	try {
		const res = await Axios.post("/auth/signup", cred);
		console.log("signed up user: ", res.data);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const Login = async (cred) => {
	try {
		const res = await Axios.post("/auth/login", cred);
		console.log("login user: ", res.data);
		return res.data;
	} catch (error) {
		console.log(error.response);
		throw error.response.data;
	}
};

export const verifyOtp = async (cred) => {
	try {
		const res = await Axios.post("/auth/verify-otp", cred);
		console.log("verify otp: ", res.data);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const resendOtp = async (cred) => {
	try {
		const res = await Axios.post("/auth/resend-otp", cred);
		console.log("user otp: ", res.data);
		return res.data;
	} catch (error) {
		console.log("resend otp: ", error.response.data);
		throw error.response.data;
	}
};

export const forgotPassword = async (cred) => {
	try {
		const res = await Axios.post("/auth/forgot-password", cred);
		console.log("forgot password: ", res.data);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const resetPassword = async (cred) => {
	try {
		const res = await Axios.post("/auth/reset-password", cred);
		console.log("reset password: ", res.data);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const checkAuth = async (cred) => {
	try {
		const res = await Axios.get("/auth/check-auth");
		console.log("check auth: ", res.data);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const logout = async () => {
	try {
		const res = await Axios.get("/auth/logout");
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
