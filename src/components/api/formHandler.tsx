import React, { createContext, useState } from "react";
import { FormType } from "helpers/typings";

interface IProps {
	postForm: (data: FormType) => Promise<void>;
	loading?: boolean;
	error?: boolean;
}

interface Props {
	children: React.ReactNode;
}

export const FormContext = createContext<IProps>(null!);

const FormWrapper: React.FC<Props> = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const postForm = async (data: FormType) => {
		setLoading(true);
		const settings = {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "content-type": "application/json" },
		};

		try {
			const fetchResponse = await fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", settings);
			const data = await fetchResponse.json();
			console.log(data, "datat from post");
			return data;
		} catch (err) {
			setError(true);
			console.error(err);
			setLoading(false);
			return err;
		}
	};

	return <FormContext.Provider value={{ postForm, loading, error }}>{children}</FormContext.Provider>;
};

export default FormWrapper;
