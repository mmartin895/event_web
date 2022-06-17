import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../../../services/EventService";
import {
	calculateFee,
	selectedTicketsToArrray,
	buyTickets,
} from "../../../services/TicketService";
import valid from "card-validator";
import default_image from "../../../assets/large.jpg";
import classes from "./EventPage.module.scss";
import {
	Button,
	Cascader,
	DatePicker,
	Form,
	Input,
	InputNumber,
	message,
	Modal,
	Radio,
	Select,
	Switch,
	TreeSelect,
} from "antd";
import Cards from "react-credit-cards";
import "react-credit-cards/lib/styles.scss";
import AuthContext from "../../../store/auth-context2";
import CardState from "./CardState";

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
	const authCtx = useContext(AuthContext);
	const { id } = useParams();

	const purchaseTickets = async (values) => {
		const tickets = selectedTicketsToArrray(selectedTickets, id);

		if (tickets.length <= 0) {
			message.error("Select tickets to purchase");
		}
		const payload = { creditDetails: values, selectedTickets, tickets };

		try {
			const data = await buyTickets(payload, authCtx.token);
			message.success(data);
		} catch (err) {
			console.log(err);
			if (err.response?.data) {
				message.error(err.response.data);
			} else {
				message.error(err.message);
			}

			if (err.response.status == 403 || err.response.status == 401) {
				authCtx.logout();
			}
		}
	};

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

	const [eventState, setEventState] = useState({ tickets: [] });
	const [selectedTickets, setSelectedTickets] = useState({});
	const navigate = useNavigate();

	const [isModalVisible, setIsModalVisible] = useState(false);

	const { cardState, handleInputChange } = CardState();

	const calculateAmount = () => {
		var amount = 0;
		for (const ticketKey in selectedTickets) {
			let ticket = selectedTickets[ticketKey];
			amount += ticket.quantity;
			if (ticket.quantity < 0) return 0;
		}
		return amount;
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const formButtom = authCtx.isLoggedIn ? (
		<Button
			type="primary"
			htmlType="submit"
			disabled={calculateAmount() <= 0}
			onClick={showModal}
		>
			Purchase
		</Button>
	) : (
		<Button
			type="primary"
			onClick={() => {
				navigate("/login");
			}}
		>
			Log in
		</Button>
	);

	useEffect(() => {
		getEvent(id).then((event) => {
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
						{/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
							{formButtom}
						</Form.Item> */}
						<Form.Item
							wrapperCol={{ offset: 0 }}
							className={classes.portaitButton}
						>
							{formButtom}
						</Form.Item>
					</Form>
					<h2>{"Total: " + calculateFee(selectedTickets) + "$"}</h2>
				</div>
			</div>
			<Modal
				className={classes.modal}
				title="Enter card information"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Cancel
					</Button>,
					// <Button key="submit" type="primary" onClick={handleOk}>
					// 	Submit
					// </Button>,
				]}
			>
				<Cards
					cvc={cardState.cvc}
					expiry={cardState.expiry}
					focused={cardState.focus}
					name={cardState.name}
					number={cardState.number}
				/>

				<div className={classes.creditFormContainer}>
					<Form
						onValuesChange={handleInputChange}
						name="basic"
						initialValues={{ remember: true }}
						onFinish={purchaseTickets}
						// onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							name="name"
							rules={[{ required: true, message: "Please input holder name!" }]}
						>
							<Input placeholder="Cardholder name" type="text" />
						</Form.Item>
						<Form.Item
							name="number"
							rules={[
								{ required: true, message: "Please input card number!" },
								{
									validator: (_, value) =>
										valid.number(value).isValid
											? Promise.resolve("Valid card number")
											: Promise.reject(new Error("Card number invalid!")),
								},
							]}
						>
							<Input type="number" placeholder="Card number" />
						</Form.Item>

						<Form.Item
							name="expiry"
							rules={[{ required: true, message: "Please input card expiry!" }]}
						>
							<Input placeholder="Expiration date" type={"number"} />
						</Form.Item>

						<Form.Item
							name="cvc"
							rules={[{ required: true, message: "Please input CVC!" }]}
						>
							<Input placeholder="CVC" />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Purchase
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</div>
	);
}

export default EventPage;
