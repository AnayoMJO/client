import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./slice/auth";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home";
import { SignupPage } from "./pages/signup";
import { LoginPage } from "./pages/login";
import { WishlistPage } from "./pages/wishlist";
import { OtpVerificationPage } from "./pages/otpVerification";
import { CartPage } from "./pages/cart";
import { ForgotPasswordPage } from "./pages/forgetPassword";
import { ResetPasswordPage } from "./pages/resetPassword";
import { Logout } from "./components/logout";
import { UserOrdersPage } from "./pages/userOrder";
import { UserProfilePage } from "./pages/userProfile";
import { Reviews } from "./components/reviews";
import { Protected } from "./components/protected";
//import { useAuthCheck } from "./useAuth/useAuthCheck";
//import { useFetchLoggedInUserDetails } from "./useAuth/useFetchedLoggedInUser";
import { ProductDetailsPage } from "./pages/productDetails";
import {
	AddProductPage,
	AdminOrdersPage,
	CheckoutPage,
	OrderSuccessPage,
	NotFoundPage,
	AdminDashboardPage,
	ProductUpdatePage,
} from "./pages/index";

function App() {
	//const isAuthChecked = useSelector(selectIsAuthChecked);
	const loggedInUser = useSelector(selectLoggedInUser);
	//useAuthCheck();
	//useFetchLoggedInUserDetails(loggedInUser);
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="verify-otp" element={<OtpVerificationPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route
					path="/reset-password/:userId/:passwordResetToken"
					element={<ResetPasswordPage />}
				/>
				<Route path="/wishlist" element={<WishlistPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/reviews" element={<Reviews />} />
				<Route
					path="/logout"
					element={
						<Protected>
							<Logout />
						</Protected>
					}
				/>
				<Route path="/my-orders" element={<UserOrdersPage />} />
				<Route path="/profile" element={<UserProfilePage />} />
				<Route path="/product-details/:id" element={<ProductDetailsPage />} />
				<Route
					path="/checkout"
					element={
						<Protected>
							<CheckoutPage />
						</Protected>
					}
				/>
				<Route
					path="/order-success/:id"
					element={
						<Protected>
							<OrderSuccessPage />
						</Protected>
					}
				/>
				{loggedInUser?.isAdmin && (
					<>
						<Route
							path="/admin/dashboard"
							element={
								<Protected>
									<AdminDashboardPage />
								</Protected>
							}
						/>
						<Route
							path="/admin/product-update/:id"
							element={
								<Protected>
									<ProductUpdatePage />
								</Protected>
							}
						/>
						<Route
							path="/admin/add-product"
							element={
								<Protected>
									<AddProductPage />
								</Protected>
							}
						/>
						<Route
							path="/admin/orders"
							element={
								<Protected>
									<AdminOrdersPage />
								</Protected>
							}
						/>
						<Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
					</>
				)}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
