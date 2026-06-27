import React, { useEffect } from "react";
import { Navbar } from "../navigation/navBar";
import { ProductList } from "../components/productList";
import { resetAddressStatus, selectAddressStatus } from "../slice/address";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../footer/footer";

export const HomePage = () => {
	const dispatch = useDispatch();
	const addressStatus = useSelector(selectAddressStatus);

	useEffect(() => {
		if (addressStatus === "fulfilled") {
			dispatch(resetAddressStatus());
		}
	}, [addressStatus, dispatch]);

	return (
		<>
			<Navbar isProductList={true} />
			<ProductList />
			<Footer />
		</>
	);
};
