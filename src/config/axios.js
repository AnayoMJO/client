import axios from "axios";

export const Axios = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000",
});
