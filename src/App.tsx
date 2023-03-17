import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import DishForm from "components/Form";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<DishForm />
		</ThemeProvider>
	);
}

export default App;
