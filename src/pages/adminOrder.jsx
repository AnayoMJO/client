import React from "react";
import { AdminOrders } from "../admin/adminOrders";
import { Navbar } from "../navigation/navBar";

export const AdminOrdersPage = () => {
	return (
		<>
			<Navbar />
			<AdminOrders />
		</>
	);
};
