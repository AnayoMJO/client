import React, { Component } from "react";
import { Typography, Button, Container } from "@mui/material";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error) {
		return { hasError: true };
	}
	handleReset = () => {
		this.setState({ hasError: false });
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			return (
				<Container sx={{ textAlign: "center", mt: 5 }}>
					<Typography variant="h4" color="error">
						something went wrong
					</Typography>
					<Button variant="contained" color="blue" onClick={this.handleReset}>
						reload Page
					</Button>
				</Container>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
