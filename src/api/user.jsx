import { Axios } from "../config/axios";

export const fetchLoggedInUserById = async (id) => {
	try {
		const res = await Axios.get("/user/:id");
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const updateUserById = async (update) => {
	try {
		const res = await Axios.patch("/user/:id", update);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
