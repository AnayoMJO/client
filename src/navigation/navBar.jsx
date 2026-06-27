import React, { useState } from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Menu } from "@mui/material";
import { Tooltip } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ShoppingCart, AccountCircle } from "@mui/icons-material";

import { selectCartItems } from "../slice/cart";
import { selectLoggedInUser } from "../slice/auth";
import { selectWishlistItems } from "../slice/wishlist";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { setSearchQuery } from "../slice/product";

export const Navbar = ({ isProductList = false }) => {
	const [searchQuery, setQuery] = useState(" ");
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [opened, setOpened] = useState(false);

	const cartItems = useSelector(selectCartItems);
	const loggedInUser = useSelector(selectLoggedInUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const is480 = useMediaQuery(theme.breakpoints.down("md"));
	const open = Boolean(anchorElUser);

	const wishlistItems = useSelector(selectWishlistItems);

	const toggleDrawer = (state) => () => {
		setOpened(state);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleNavigation = (path) => {
		navigate(path);
	};

	const handleSearch = (e) => {
		const value = e.target.value;
		setQuery(value);
		dispatch(setSearchQuery(value));
	};

	return (
		<>
			{!is480 ? (
				<AppBar
					position="sticky"
					sx={{
						backgroundColor: "white",
						boxShadow: "none",
						color: "text.primary",
					}}>
					<Toolbar
						sx={{
							p: 1,
							height: "4rem",
							display: "flex",
							justifyContent: "space-around",
						}}>
						<Typography
							variant="h6"
							noWrap
							component={Link}
							to="/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontWeight: 900,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}>
							AnayoMJO WEB3 ECOMMERCE STORE
						</Typography>

						<Stack
							direction="row"
							spacing={1}
							sx={{ flexGrow: 1, justifyContent: "center", color: "inherit" }}>
							<input
								value={searchQuery}
								type="text"
								placeholder="Search By Product name/title, describtion"
								style={{
									padding: "8px",
									border: "1px solid #ccc",
									borderRadius: "4px",
									width: "450px",
								}}
								onChange={handleSearch}
							/>
						</Stack>

						<Stack
							sx={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
								columnGap: 2,
							}}>
							<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
								<Tooltip title="Cart">
									<IconButton
										color="inherit"
										onClick={() => handleNavigation("/cart")}>
										<Badge badgeContent={4} color="error">
											<ShoppingCart />
										</Badge>
									</IconButton>
								</Tooltip>
								<Tooltip title="Account">
									<IconButton color="inherit" onClick={handleOpenUserMenu}>
										<AccountCircle />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={open}
									onClose={handleCloseUserMenu}>
									{loggedInUser?.isAdmin && (
										<MenuItem onClick={handleCloseUserMenu}>
											<Typography
												component={Link}
												color={"text.primary"}
												sx={{ textDecoration: "none" }}
												to="/admin/add-product"
												textalign="center">
												Add new Product
											</Typography>
										</MenuItem>
									)}
									<MenuItem onClick={() => handleNavigation("/signup")}>
										Signup
									</MenuItem>
									<MenuItem onClick={() => handleNavigation("/login")}>
										Login
									</MenuItem>
									<MenuItem onClick={() => handleNavigation("/logout")}>
										Logout
									</MenuItem>
									<MenuItem onClick={() => handleNavigation("/my-orders")}>
										My Orders
									</MenuItem>
									<MenuItem onClick={() => handleNavigation("/profile")}>
										Profile
									</MenuItem>
								</Menu>
								{loggedInUser?.isAdmin && (
									<Button variant="contained">Admin</Button>
								)}
								<Stack
									sx={{
										flexDirection: "row",
										columnGap: "1rem",
										alignItems: "center",
										justifyContent: "center",
									}}>
									{cartItems?.length > 0 && (
										<Badge badgeContent={cartItems.length} color="error">
											<IconButton onClick={() => navigate("/cart")}>
												<ShoppingCart />
											</IconButton>
										</Badge>
									)}
									{!loggedInUser?.isAdmin && (
										<Stack>
											<Badge
												badgeContent={wishlistItems?.length > -1}
												color="error">
												<IconButton component={Link} to={"/wishlist"}>
													<FavoriteBorderIcon />
												</IconButton>
											</Badge>
										</Stack>
									)}
								</Stack>
							</Stack>
						</Stack>
					</Toolbar>
				</AppBar>
			) : (
				<AppBar
					position="sticky"
					sx={{
						backgroundColor: "white",
						boxShadow: "none",
						color: "text.primary",
					}}>
					<IconButton
						onClick={toggleDrawer(true)}
						sx={{ position: "fixed", top: 10, left: 10, zIndex: 1000 }}>
						<MenuIcon fontSize="large" />
					</IconButton>
					<Drawer anchor="left" open={opened} onClose={toggleDrawer(false)}>
						<Stack sx={{ width: 200, padding: 2 }}>
							<IconButton
								onClick={toggleDrawer(false)}
								sx={{ position: "absolute", top: 10, right: 10 }}>
								<CloseIcon fontSize="large" />
							</IconButton>
							<Typography
								variant="h6"
								sx={{
									paddingBottom: "10px",
									textAlign: "center",
									fontWeight: "bold",
									marginBottom: -2,
									marginTop: 5,
								}}>
								AnayoMJO Store
							</Typography>
							<Typography
								variant="subtitle1"
								component={Link}
								color={"text.primary"}
								to="/signup"
								sx={{
									padding: 2,
									fontWeight: "bold",
									textDecoration: "none",
									textalign: "center",
									marginBottom: -2,
								}}>
								Signup
							</Typography>
							<Typography
								variant="subtitle1"
								component={Link}
								color={"text.primary"}
								to="/login"
								sx={{
									padding: 2,
									fontWeight: "bold",
									textDecoration: "none",
									textalign: "center",
									marginBottom: -2,
									marginTop: -2,
								}}>
								Login
							</Typography>
							<Typography
								variant="subtitle1"
								component={Link}
								color={"text.primary"}
								to="/logout"
								sx={{
									padding: 2,
									fontWeight: "bold",
									textDecoration: "none",
									textalign: "center",
									marginBottom: -2,
									marginTop: -2,
								}}>
								Logout
							</Typography>
							<Typography
								variant="subtitle1"
								component={Link}
								color={"text.primary"}
								to="/profile"
								sx={{
									padding: 2,
									fontWeight: "bold",
									textDecoration: "none",
									textalign: "center",
									marginBottom: -2,
									marginTop: -2,
								}}>
								Profile
							</Typography>
							<Typography
								variant="subtitle1"
								component={Link}
								color={"text.primary"}
								to="/my-orders"
								sx={{
									padding: 2,
									fontWeight: "bold",
									textDecoration: "none",
									textalign: "center",
									marginBottom: -2,
									marginTop: -2,
								}}>
								My Orders
							</Typography>
							<Typography
								variant="subtitle1"
								component={Link}
								color={"text.primary"}
								to="/cart"
								sx={{
									padding: 2,
									fontWeight: "bold",
									textDecoration: "none",
									textalign: "center",
									marginBottom: -2,
									marginTop: -2,
								}}>
								Cart
							</Typography>
							<Typography
								variant="subtitle1"
								component={Link}
								color={"text.primary"}
								to="/wishlist"
								sx={{
									padding: 2,
									fontWeight: "bold",
									textDecoration: "none",
									textalign: "center",
									marginBottom: -2,
									marginTop: -2,
								}}>
								WishList
							</Typography>
						</Stack>
					</Drawer>
					<Toolbar
						sx={{
							p: 1,
							height: "4rem",
							justifyContent: "space-around",
						}}>
						<Stack
							sx={{
								display: "flex",
								flexDirection: "column",
								columnGap: "20px",
							}}>
							<Stack>
								<Typography
									variant="h6"
									component={Link}
									to="/"
									gutterBottom="10px"
									sx={{
										mr: 2,
										display: { xs: "flex", md: "flex" },
										fontWeight: 600,
										letterSpacing: ".3rem",
										color: "inherit",
										textDecoration: "none",
										paddingLeft: "50px",
									}}>
									AnayoMJO WEB3 ECOMMERCE STORE
								</Typography>
							</Stack>
							<Stack spacing={1} sx={{ flexGrow: 1, color: "inherit" }}>
								<input
									value={searchQuery}
									type="text"
									placeholder="Search By Product name/title, describtion"
									style={{
										padding: "8px",
										border: "1px solid #ccc",
										borderRadius: "4px",
										width: "330px",
										marginLeft: "50px",
									}}
									onChange={handleSearch}
								/>
							</Stack>
						</Stack>
					</Toolbar>
				</AppBar>
			)}
		</>
	);
};
