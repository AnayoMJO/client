import { Axios } from "../config/axios";

export const addToCart = async (item) => {
	try {
		const res = await Axios.post("/cart", item);
		console.log("added to cart:", res.data);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const fetchCartByUserId = async (id) => {
	try {
		const res = await Axios.get(`/cart/user/${id}`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const updateCartItemById = async (update) => {
	try {
		const res = await Axios.patch(`/cart/${update._id}`, update);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const deleteCartItemById = async (id) => {
	try {
		const res = await Axios.delete(`/cart/${id}`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const resetCartByUserId = async (userId) => {
	try {
		const res = await Axios.delete(`/cart/user/${userId}`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
