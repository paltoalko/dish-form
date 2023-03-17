import React, { createContext, useState } from "react";
import { FormType } from "helpers/typings";

interface IProps {
	postForm: (data: FormType) => Promise<void>;
	loading?: boolean;
	error?: boolean;
	success?: boolean;
}

interface Props {
	children: React.ReactNode;
}

export const FormContext = createContext<IProps>(null!);

const FormWrapper: React.FC<Props> = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const postForm = async (data: FormType) => {
		setLoading(true);
		const settings = {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "content-type": "application/json" },
		};

		try {
			const fetchResponse = await fetch("https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/", settings);
			const data = await fetchResponse.json();
			setLoading(false);
			setSuccess(true);
			return data;
		} catch (err) {
			setSuccess(false);
			setError(true);
			console.error(err);
			setLoading(false);
			return err;
		}
	};

	return <FormContext.Provider value={{ postForm, loading, error, success }}>{children}</FormContext.Provider>;
};

export default FormWrapper;
