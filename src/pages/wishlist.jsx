import React from "react";
import { Wishlist } from "../components/wishlist";
import { Navbar } from "../navigation/navBar";
import { Footer } from "../footer/footer";

export const WishlistPage = () => {
	return (
		<>
			<Navbar />
			<Wishlist />
			<Footer />
		</>
	);
};
