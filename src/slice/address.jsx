import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	addAddress,
	getAddressByUserId,
	upDateAddressById,
	deleteAddressById,
} from "../api/address";

const initialState = {
	status: "idle",
	addressAddStatus: "idle",
	addressDeleteStatus: "idle",
	addressUpdateStatus: "idle",
	addresses: [],
	errors: null,
	successMessage: null,
};

export const addAddressAsync = createAsyncThunk(
	"address/addAddressAsync",
	async (address) => {
		const createdAddress = await addAddress(address);
		return createdAddress;
	}
);

export const fetchAddressByUserIdAsync = createAsyncThunk(
	"address/fetchAddressByUserIdAsync",
	async (id) => {
		const addresses = await getAddressByUserId(id);
		return addresses;
	}
);

export const upDateAddressByIdAsync = createAsyncThunk(
	"address/upDateAddressByIdAsync",
	async (id) => {
		const updateAdress = await upDateAddressById(id);
		return updateAdress;
	}
);

export const deleteAddressByIdAsync = createAsyncThunk(
	"address/deleteAddressByIdAsync",
	async (id) => {
		const deleteAddress = await deleteAddressById(id);
		return deleteAddress;
	}
);

const addressSlice = createSlice({
	name: "addressSlice",
	initialState: initialState,
	reducers: {
		resetAddressStatus: (state) => {
			state.status = "idle";
		},
		resetAddressAddStatus: (state) => {
			state.addressAddStatus = "idle";
		},
		resetAddressDeleteStatus: (state) => {
			state.addressDeleteStatus = "idle";
		},
		resetAddressUpdateStatus: (state) => {
			state.addressUpdateStatus = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addAddressAsync.pending, (state) => {
				state.addressAddStatus = "pending";
			})
			.addCase(addAddressAsync.fulfilled, (state, action) => {
				state.addressAddStatus = "fulfilled";
				state.addresses.push(action.payload);
			})
			.addCase(addAddressAsync.rejected, (state, action) => {
				state.addressAddStatus = "rejected";
				state.errors = action.error;
			})
			.addCase(fetchAddressByUserIdAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(fetchAddressByUserIdAsync.fulfilled, (state, action) => {
				state.status = "fulfilled";
				state.addresses = action.payload;
			})
			.addCase(fetchAddressByUserIdAsync.rejected, (state, action) => {
				state.status = "rejected";
				state.errors = action.error;
			})
			.addCase(upDateAddressByIdAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(upDateAddressByIdAsync.fulfilled, (state, action) => {
				state.status = "fulfilled";
				const index = state.addresses.findIndex(
					(address) => address._id === action.payload._id
				);
				state.addresses[index] = action.payload;
			})
			.addCase(upDateAddressByIdAsync.rejected, (state, action) => {
				state.addressUpdateStatus = "rejected";
				state.errors = action.error;
			})
			.addCase(deleteAddressByIdAsync.pending, (state) => {
				state.addressDeleteStatus = "pending";
			})
			.addCase(deleteAddressByIdAsync.fulfilled, (state, action) => {
				state.addressDeleteStatus = "fulfilled";
				state.addresses = state.addresses.filter(
					(address) => address._id !== action.payload._id
				);
			})
			.addCase(deleteAddressByIdAsync.rejected, (state, action) => {
				state.addressDeleteStatus = "rejection";
				state.errors = action.error;
			});
	},
});

export const selectAddressStatus = (state) => state.addressSlice.status;
export const selectAddresses = (state) => state.addressSlice.address;
export const selectAddressErrors = (state) => state.addressSlice.errors;
export const selectAddressSuccessMessagee = (state) =>
	state.addressSlice.successMessage;
export const selectAddressAddStatus = (state) =>
	state.addressSlice.addressAddStatus;
export const selectAddressDeleteStatus = (state) =>
	state.addressSlice.addressDeleteStatus;
export const selectAddressUpdateStatus = (state) =>
	state.addressSlice.addressUpdateStatus;

export const {
	resetAddressAddStatus,
	resetAddressStatus,
	resetAddressDeleteStatus,
	resetAddressUpdateStatus,
} = addressSlice.actions;

export default addressSlice.reducer;
