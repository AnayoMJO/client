import { Axios } from "../config/axios";

export const createOrder = async (order) => {
	try {
		const res = await Axios.post("/order", order);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const getOrderByUserId = async (id) => {
	try {
		const res = await Axios.get(`/order/user/${id}`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const getAllOrders = async () => {
	try {
		const res = await Axios.get(`/order`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const updateOrderById = async (update) => {
	try {
		const res = await Axios.patch(`/order/${update._id}`, update);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
