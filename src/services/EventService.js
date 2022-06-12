import axios from "axios";
const backend = "http://localhost:5000";

export const addEvent = async (event, token = "") => {
	console.log(event);
	const URL = `${backend}/event/create`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(URL, event, config);
	return res.data;
};

export const updateEventPoster = async (formdata, token) => {
	console.log(formdata);
	const URL = `${backend}/event/poster`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "multipart/form-data",
		},
	};

	const res = await axios.post(URL, formdata, config);
	return res.data;
};

export const addEventWithPoster = async (formdata, token) => {
	console.log(formdata);
	const URL = `${backend}/event/createwithpic`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "multipart/form-data",
		},
	};

	const res = await axios.post(URL, formdata, config);
	return res.data;
};

export const updateEventGeneralInfo = async (ticket, token) => {
	const badToken = "sdadasd";

	const URL = `${backend}/event/update`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.patch(URL, ticket, config);
	return res.data;
};

export const getAllEvents = async () => {
	const URL = `${backend}/event/all`;
	const config = {
		headers: {
			Authorization: `Bearer`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.get(URL, config);
	console.log(res.data);
	return res.data;
};
export const getEvent = async (eventId) => {
	const URL = `${backend}/event/${eventId}`;
	const config = {
		headers: {
			Authorization: `Bearer`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.get(URL, config);
	// console.log(res);
	// console.log(res.data);
	return res.data;
};

export const cutNameIfGreater = (name) => {
	if (name.length < 28) return name;
	else return name.substring(0, 25) + "...";
};

export const searchEvents = async (searchValues) => {
	const searchObject = {};
	for (const name in searchValues) {
		if (searchValues[name]) {
			searchObject[name] = searchValues[name];
		} // there should be values.avatar which is a File object
	}
	if (searchValues.date_range) {
		searchObject.startTime = new Date(searchValues.date_range[0]);
		searchObject.endTime = new Date(searchValues.date_range[1]);
		delete searchObject.date_range;
	}
	const URL = `${backend}/event/search`;
	const config = {
		headers: {
			Authorization: `Bearer`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(URL, searchObject, config);
	return res.data;
};

export const getPersonalEvents = async (token) => {
	const URL = `${backend}/event/personal`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.get(URL, config);
	return res.data;
};

export const deleteEvent = async (token, event) => {
	console.log(event);

	const URL = `${backend}/event/delete`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(URL, { event }, config);
	return res.data;
};

export const addEventTickets = async (payload, token) => {
	const badToken = "sdadasd";

	const URL = `${backend}/event/tickets`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(URL, payload, config);
	return res.data;
};

export const updateTicket = async (ticket, token) => {
	const badToken = "sdadasd";

	const URL = `${backend}/event/tickets`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.patch(URL, ticket, config);
	return res.data;
};

export const deleteEventTicket = async (ticketId, token) => {
	console.log(ticketId);

	const badToken = "sdadasd";

	const URL = `${backend}/event/tickets/delete`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(URL, { ticketId: ticketId }, config);
	return res.data;
};
