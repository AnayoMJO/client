import React from "react";
import { Navbar } from "../navigation/navBar";
import { Cart } from "../components/cart";
import { Footer } from "../footer/footer";

export const CartPage = () => {
	return (
		<>
			<Navbar />
			<Cart />
			<Footer />
		</>
	);
};
