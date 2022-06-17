import axios from "axios";

const backend = process.env.REACT_APP_API;

export const calculateFee = (selectedTickets) => {
	var price = 0;
	for (const ticketKey in selectedTickets) {
		let ticket = selectedTickets[ticketKey];
		price += ticket.ticketPrice * ticket.quantity;
	}
	return price;
};

export const selectedTicketsToArrray = (selectedTickets, eventId) => {
	var array = [];
	for (const ticketKey in selectedTickets) {
		let ticket = selectedTickets[ticketKey];

		if (ticket.quantity > 0) {
			array.push({
				ticket: ticketKey,
				event: eventId,
				quantity: ticket.quantity,
			});
		}
	}
	return array;
};

export const buyTickets = async (payload, token) => {
	const badToken = "sdadasd";

	const URL = `${backend}/tickets/purchase`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(URL, payload, config);
	return res.data;
};
