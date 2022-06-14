import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../../services/EventService";

import default_image from "../../../assets/large.jpg";
import classes from "./EventPage.module.scss";
import {
	Button,
	Cascader,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Switch,
	TreeSelect,
} from "antd";

const fomatDateToDayTime = (d) => {
	const date = new Date(d);
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const day = days[date.getDay()];
	return day + ", " + date.getHours() + ":" + date.getMinutes() + " h";
};

function formatDate(date) {
	function padTo2Digits(num) {
		return num.toString().padStart(2, "0");
	}
	return [
		padTo2Digits(date.getDate()),
		padTo2Digits(date.getMonth() + 1),
		date.getFullYear(),
	].join(".");
}

function EventPage(props) {
	const layout = {
		labelCol: { span: 12 },
		wrapperCol: { span: 8 },
	};
	const transformTickets = (tickets) => {
		const selectedTickets = {};

		tickets.forEach((ticket) => {
			selectedTickets[ticket._id] = {
				ticketPrice: ticket.ticketPrice,
				quantity: 0,
			};
		});
		return selectedTickets;
	};

	const calculateFee = (selectedTickets) => {
		var price = 0;
		for (const ticketKey in selectedTickets) {
			let ticket = selectedTickets[ticketKey];
			price += ticket.ticketPrice * ticket.quantity;
		}
		return price;
	};

	const { id } = useParams();
	const [eventState, setEventState] = useState({ tickets: [] });
	const [selectedTickets, setSelectedTickets] = useState({});

	useEffect(() => {
		getEvent(id).then((event) => {
			console.log(Object.keys(event));
			setEventState(event);
			setSelectedTickets(transformTickets(event.tickets));
		});
	}, []);

	const onChangeQuantity = (elem) => {
		const { ticketPrice, _id } = elem;
		return (event) => {
			const ticketQuantity = event.target.value;

			setSelectedTickets({
				...selectedTickets,
				...{
					[_id]: {
						ticketPrice,
						quantity: +ticketQuantity,
					},
				},
			});
		};
	};

	const calcTotal = () => {
		return 5 + "$";
	};
	return (
		<div>
			<div className={classes.imageContainer}>
				<img src={eventState.img ? eventState.img : default_image}></img>
			</div>
			<div className={classes.flexContainer}>
				<div className={classes.eventDescriptionContainer}>
					<h2>{eventState.name}</h2>
					<h3>
						{eventState.location +
							", " +
							formatDate(new Date(eventState.startTime))}
					</h3>
					<p>{eventState.description}</p>
				</div>
				<div className={classes.ticketContainer}>
					<Form {...layout}>
						{eventState.tickets.map((ticket) => {
							return (
								<Form.Item
									key={ticket._id}
									label={
										ticket.ticketName + " (" + ticket.ticketPrice + "$" + ")"
									}
									name={ticket._id}
									initialValue={0}
								>
									<Input
										type="number"
										ticket={ticket._id}
										style={{ width: "70px" }}
										min={0}
										onChange={onChangeQuantity(ticket)}
									></Input>
								</Form.Item>
							);
						})}
						<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
							<Button type="primary" htmlType="submit">
								Purchase
							</Button>
						</Form.Item>
					</Form>
					<h2>{"Total: " + calculateFee(selectedTickets) + "$"}</h2>
				</div>
			</div>
		</div>
	);
}

export default EventPage;
