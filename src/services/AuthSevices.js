import axios from "axios";
const backend = "http://localhost:5000";

export const registerUser = async (user) => {
	const URL = `${backend}/auth/register`;
	const config = {
		headers: {
			Authorization: `Bearer`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(URL, user, config);
	return res.data;
};

export const loginUser = async (credentials) => {
	const URL = `${backend}/auth/login`;
	const config = {
		headers: {
			Authorization: `Bearer`,
			"Content-Type": "application/json",
		},
	};
	const res = await axios.post(URL, credentials, config);
	return res.data;
};
