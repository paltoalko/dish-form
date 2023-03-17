import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import DishForm from "components/Form";
import FormWrapper from "components/api/formHandler";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<FormWrapper>
				<DishForm />
			</FormWrapper>
		</ThemeProvider>
	);
}

export default App;
