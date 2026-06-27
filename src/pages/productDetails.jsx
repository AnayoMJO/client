import React from "react";
import { Navbar } from "../navigation/navBar";
import { ProductDetails } from "../components/productDetails";
import { Footer } from "../footer/footer";

export const ProductDetailsPage = () => {
	return (
		<>
			<Navbar />
			<ProductDetails />
			<Footer />
		</>
	);
};
