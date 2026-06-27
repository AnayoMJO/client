import { Axios } from "../config/axios";

export const addAddress = async (address) => {
	try {
		const req = await Axios.post("/address", address);
		return req.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const getAddressByUserId = async (id) => {
	try {
		const req = await Axios.get("/address/user/:id");
		return req.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const upDateAddressById = async (update) => {
	try {
		const res = await Axios.patch("/address/:id", update);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const deleteAddressById = async (id) => {
	try {
		const req = await Axios.delete("/address/:id");
		return req.data;
	} catch (error) {
		throw error;
	}
};
