import React from "react";
import { Navbar } from "../navigation/navBar";
import { AdminDashBoard } from "../admin/adminDashboard";

export const AdminDashboardPage = () => {
	return (
		<>
			<Navbar isProductList={true} />
			<AdminDashBoard />
		</>
	);
};
