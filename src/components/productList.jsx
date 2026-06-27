import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid2,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductsAsync,
	resetProductFetchStatus,
	selectProductFetchStatus,
	selectProductTotalResults,
	selectProducts,
	selectSearchQuery,
} from "../slice/product";
import { ProductCard } from "./productCard";
import Pagination from "@mui/material/Pagination";
import { ITEMS_PER_PAGE } from "../constants/index";
import {
	createWishlistItemAsync,
	deleteWishlistItemByIdAsync,
	resetWishlistItemAddStatus,
	resetWishlistItemDeleteStatus,
	selectWishlistItemAddStatus,
	selectWishlistItemDeleteStatus,
	selectWishlistItems,
} from "../slice/wishlist";
import { selectLoggedInUser } from "../slice/auth";
import { toast } from "react-toastify";
import { loadingAnimation } from "../assets/index";
import { resetCartItemAddStatus, selectCartItemAddStatus } from "../slice/cart";
import { ProductBanner } from "./productBanner";
import Lottie from "lottie-react";

const sortOptions = [
	{ name: "Price: low to high", sort: "price", order: "asc" },
	{ name: "Price: high to low", sort: "price", order: "desc" },
];

export const ProductList = () => {
	const [filters, setFilters] = useState({});
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState(null);
	const theme = useTheme();

	const is1200 = useMediaQuery(theme.breakpoints.down(1200));
	const is800 = useMediaQuery(theme.breakpoints.down(800));
	const is700 = useMediaQuery(theme.breakpoints.down(700));
	const is600 = useMediaQuery(theme.breakpoints.down(600));
	const is500 = useMediaQuery(theme.breakpoints.down(500));
	const is488 = useMediaQuery(theme.breakpoints.down(488));

	const searchQuery = useSelector(selectSearchQuery);
	const products = useSelector(selectProducts);

	const totalResults = useSelector(selectProductTotalResults);
	const loggedInUser = useSelector(selectLoggedInUser);

	const productFetchStatus = useSelector(selectProductFetchStatus);

	const wishlistItems = useSelector(selectWishlistItems);
	const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
	const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);

	const cartItemAddStatus = useSelector(selectCartItemAddStatus);

	const dispatch = useDispatch();

	const filteredProducts = searchQuery
		? products.filter(
				(product) =>
					product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.description.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: products;

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
	}, []);

	useEffect(() => {
		const finalFilters = { ...filters };
		finalFilters["pagination"] = { page: page, limit: ITEMS_PER_PAGE };
		finalFilters["sort"] = sort;
		if (!loggedInUser?.isAdmin) {
			finalFilters["user"] = true;
		}
		dispatch(fetchProductsAsync(finalFilters));
	}, [filters, page, sort, dispatch, loggedInUser?.isAdmin]);

	useEffect(() => {
		setPage(1);
	}, [totalResults]);

	const handleAddRemoveFromWishlist = (e, productId) => {
		if (!loggedInUser) {
			toast.error("Please log in to manage your wishlist");
			return;
		}
		if (e.target.checked) {
			const data = { user: loggedInUser?._id, product: productId };
			dispatch(createWishlistItemAsync(data));
		} else if (!e.target.checked) {
			const index = wishlistItems.findIndex(
				(item) => item.product._id === productId
			);
			dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
		}
	};

	useEffect(() => {
		if (wishlistItemAddStatus === "fulfilled") {
			toast.success("Product added to wishlist");
		} else if (wishlistItemAddStatus === "rejected") {
			toast.error("Error adding product to wishlist, please try again later");
		}
	}, [wishlistItemAddStatus]);

	useEffect(() => {
		if (wishlistItemDeleteStatus === "fulfilled") {
			toast.success("Product removed from wishlist");
		} else if (wishlistItemDeleteStatus === "rejected") {
			toast.error(
				"Error removing product from wishlist, please try again later"
			);
		}
	}, [wishlistItemDeleteStatus]);

	useEffect(() => {
		if (cartItemAddStatus === "fulfilled") {
			toast.success("Product added to cart");
		} else if (cartItemAddStatus === "rejected") {
			toast.error("Error adding product to cart, please try again later");
		}
	}, [cartItemAddStatus]);

	useEffect(() => {
		if (productFetchStatus === "rejected") {
			toast.error("Error fetching products, please try again later");
		}
	}, [productFetchStatus]);

	useEffect(() => {
		return () => {
			dispatch(resetProductFetchStatus());
			dispatch(resetWishlistItemAddStatus());
			dispatch(resetWishlistItemDeleteStatus());
			dispatch(resetCartItemAddStatus());
		};
	}, [dispatch]);

	return (
		<>
			{productFetchStatus === "pending" ? (
				<Stack
					width={is500 ? "35vw" : "25rem"}
					height={"calc(100vh - 4rem)"}
					justifyContent={"center"}
					marginRight={"auto"}
					marginLeft={"auto"}>
					<Lottie animationData={loadingAnimation} />
				</Stack>
			) : (
				<>
					<Stack mb={"3rem"}>
						{!is600 && (
							<Stack
								sx={{
									width: "100%",
									height: is800 ? "300px" : is1200 ? "400px" : "500px",
								}}>
								<ProductBanner />
							</Stack>
						)}

						<Stack rowGap={5} mt={is600 ? 2 : 0}>
							<Stack
								flexDirection={"row"}
								mr={"2rem"}
								justifyContent={"flex-end"}
								alignItems={"center"}
								columnGap={5}>
								<Stack alignSelf={"flex-end"} width={"12rem"}>
									<FormControl fullWidth>
										<InputLabel id="sort-dropdown">Price</InputLabel>
										<Select
											variant="standard"
											labelId="sort-dropdown"
											label="Sort"
											onChange={(e) => setSort(e.target.value)}
											value={sort}>
											<MenuItem bgcolor="text.secondary" value={null}>
												Reset
											</MenuItem>
											{sortOptions.map((option) => (
												<MenuItem key={option} value={option}>
													{option.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Stack>
							</Stack>
							<Grid2
								gap={is700 ? 1 : 2}
								container
								spacing={2}
								display={"flex"}
								flexWrap={"wrap"}
								flexDirection={"row"}
								justifyContent={"center"}
								alignContent={"center"}>
								{filteredProducts.length > 0 ? (
									filteredProducts.map((product) => (
										<Grid2
											key={product._id}
											item={"true"}
											xs={12}
											sm={6}
											md={4}>
											<ProductCard
												id={product._id}
												title={product.title}
												thumbnail={product.thumbnail}
												brand={product.brand.name}
												price={product.price}
												handleAddRemoveFromWishlist={
													handleAddRemoveFromWishlist
												}
												stockQuantity={product.stockQuantity}
											/>
										</Grid2>
									))
								) : (
									<p>No products found</p>
								)}
							</Grid2>

							<Stack
								alignSelf={is488 ? "center" : "flex-end"}
								mr={is488 ? 0 : 5}
								rowGap={2}
								p={is488 ? 1 : 0}>
								<Pagination
									size={is488 ? "medium" : "large"}
									page={page}
									onChange={(e, page) => setPage(page)}
									count={Math.ceil(
										Number(totalResults) / Number(ITEMS_PER_PAGE)
									)}
									variant="outlined"
									shape="rounded"
								/>
								<Typography textAlign={"center"}>
									Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
									{page * ITEMS_PER_PAGE > totalResults
										? totalResults
										: page * ITEMS_PER_PAGE}{" "}
									of {totalResults} results
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				</>
			)}
		</>
	);
};
