import axios from "axios";
// const backend = "http://localhost:5000";
// const backend = "http://192.168.0.25:5000";

//

const backend = process.env.REACT_APP_API;




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
	console.log("login funkcija")
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


export const subscribeUserForPushNotfications = async (payload, token) => {
	const badToken = "sdadasd";

	const URL = `${backend}/auth/subcribe`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(URL, payload, config);
	return res.data;
};
