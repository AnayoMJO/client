import { Axios } from "../config/axios";

export const fetchAllBrands = async () => {
	try {
		const res = await Axios.get("/brand");
		console.log("brands", res.data);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
