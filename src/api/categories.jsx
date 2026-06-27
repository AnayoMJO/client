import { Axios } from "../config/axios";

export const fetchAllCategories = async () => {
	try {
		const res = await Axios.get("/category");
		console.log("API Categories:", res.data);
		return res.data;
	} catch (error) {
		throw error.response ? error.response.data : error.message;
	}
};
