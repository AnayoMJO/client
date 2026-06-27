import React from "react";
import ReactDOM from "react-dom/client";
//import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/errorBoundary";
import ErrorMessage from "./components/ErrorMessage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<ErrorBoundary>
					<ErrorMessage />
					<BrowserRouter>
						<ToastContainer
							position="top-right"
							autoClose={1500}
							closeOnClick
						/>
						<App />
					</BrowserRouter>
				</ErrorBoundary>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
