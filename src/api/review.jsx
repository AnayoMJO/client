import { Axios } from "../config/axios";

export const createReview = async (review) => {
	try {
		const res = await Axios.post("/review", review);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const fetchReviewsByProductId = async (id) => {
	try {
		const res = await Axios.get(`/review/product/${id}`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const updateReviewById = async (update) => {
	try {
		const res = await Axios.patch(`/review/${update._id}`, update);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const deleteReviewById = async (id) => {
	try {
		const res = await Axios.delete(`/reviews/${id}`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
