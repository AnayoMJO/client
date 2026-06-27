import React from "react";
import { UserOrders } from "../components/order";
import { Navbar } from "../navigation/navBar";
import { Footer } from "../footer/footer";

export const UserOrdersPage = () => {
	return (
		<>
			<Navbar />
			<UserOrders />
			<Footer />
		</>
	);
};
