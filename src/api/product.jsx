import { Axios } from "../config/axios";

export const addProduct = async (data) => {
	try {
		const res = await Axios.post("/product", data);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const fetchProducts = async (filters) => {
	let queryString = " ";

	if (filters.brand) {
		filters.brand.map((brand) => {
			queryString += `brand=${brand}&`;
			return queryString;
		});
	}
	if (filters.category) {
		filters.category.map((category) => {
			queryString += `category=${category}&`;
			return queryString;
		});
	}

	if (filters.pagination) {
		queryString += `page=${filters.pagination.page}&limit=${filters.pagination.limit}&`;
	}

	if (filters.sort) {
		queryString += `sort=${filters.sort.sort}&order=${filters.sort.order}&`;
	}

	if (filters.user) {
		queryString += `user=${filters.user}&`;
	}

	try {
		const res = await Axios.get(`/product?${queryString}`);
		const totalResults = await res.headers.get("X-Total-Count");
		return { data: res.data, totalResults: totalResults };
	} catch (error) {
		throw error.response ? error.response.data : error.message;
	}
};
export const fetchProductById = async (id) => {
	try {
		const res = await Axios.get(`/product/${id}`);
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error);
		throw error.response.data;
	}
};
export const updateProductById = async (update) => {
	try {
		const { _id, ...updateData } = update;
		const res = await Axios.patch(`/product/${update._id}`, updateData);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const undeleteProductById = async (id) => {
	try {
		const res = await Axios.patch(`/product/undelete/${id}`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const deleteProductById = async (id) => {
	try {
		const res = await Axios.delete(`/product/${id}`);
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};
