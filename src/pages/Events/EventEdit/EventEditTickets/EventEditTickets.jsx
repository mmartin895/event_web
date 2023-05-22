import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../../../store/auth-context2";

import { Form, Input, Button, message, Space } from "antd";

import {
	DeleteFilled,
	MinusCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";

import {
	getEvent,
	addEventTickets,
	deleteEventTicket,
	updateTicket,
} from "../../../../services/EventService";
import classes from "./EventEditTickets.module.scss";
import EventEditMenu from "../EventEditMenu/EventEditMenu";
import EventEditSideBar from "../EventEditMenu/EventEditSideBar";

function EventEditTickets(props) {
	const eventId = useParams().id;

	const [tickets, setTickets] = useState([]);
	const authCtx = useContext(AuthContext);
	const [eventState, setEventState] = useState({});

	const getTicketsInfo = (eventId) => {
		getEvent(eventId).then((data) => {
			setTickets(data.tickets);
			setEventState({ event: data });
		});
	};

	useEffect(() => {
		getTicketsInfo(eventId);
	}, []);

	const onUpdateTicketInfo = async (ticket) => {
		try {
			console.log("im here");

			//setTickets([]);

			const data = await updateTicket(ticket, authCtx.token);
			setTickets([]);
			getTicketsInfo(eventId);
			console.log(ticket);
			message.success(data);
		} catch (err) {
			console.log(err);
			message.error(err.message);
			console.log(err.response.status);
			if (err.response.status == 403 || err.response.status == 401) {
				authCtx.logout();
			}
		}
	};
	const onAddNewTickets = async (values) => {
		try {
			const data = await addEventTickets(
				{ tickets: values.tickets, eventId },
				authCtx.token
			);
			console.log(data);
			message.success(data);
			getTicketsInfo(eventId);
		} catch (err) {
			console.log(err);
			message.error(err.message);
			console.log(err.response.status);
			if (err.response.status == 403 || err.response.status == 401) {
				authCtx.logout();
			}
		}
	};

	const onDeleteTicket = async (ticketId) => {
		console.log(ticketId);
		try {
			const data = await deleteEventTicket(ticketId, authCtx.token);
			console.log(data);
			message.success(data);

			getTicketsInfo(eventId);
		} catch (err) {
			console.log(err);
			message.error(err.message);
			console.log(err.response.status);
			if (err.response.status == 403 || err.response.status == 401) {
				authCtx.logout();
			}
		}
	};

	return (
		<>
			<EventEditSideBar eventName={eventState.event?.name}></EventEditSideBar>
			<div className={classes.flexRow}>
				<EventEditMenu className={classes.menu}></EventEditMenu>
				<div className={classes.topDiv}>
					<div className={classes.headerCont}>
						<h1>Edit tickets</h1>
					</div>

					<div className={classes.formContainer}>
						{tickets.map((elem) => {
							return (
								<Form
									// key={elem._id}
									initialValues={elem}
									layout={"inline"}
									className={classes.form}
									onFinish={onUpdateTicketInfo}
								>
									<Form.Item
										name={"ticketName"}
										rules={[{ required: true, message: "Missing ticket name" }]}
										label="Name"
									>
										<Input placeholder="First Name" />
									</Form.Item>
									<Form.Item
										name={"quantity"}
										rules={[{ required: true, message: "Missing quantity" }]}
										label="Quantity"
									>
										<Input
											style={{ width: "70px" }}
											type="number"
											placeholder="Ticket quantity"
										/>
									</Form.Item>
									<Form.Item
										label="Price"
										name={"ticketPrice"}
										rules={[{ required: true, message: "Missing price" }]}
									>
										<Input
											style={{ width: "70px" }}
											type="number"
											placeholder="Ticket price"
										/>
									</Form.Item>
									<Form.Item
										className={classes.hiddenItem}
										name="_id"
										rules={[{ required: true, message: "Missing ticket name" }]}
									>
										<Input disabled />
									</Form.Item>
									<Button type="primary" htmlType="submit">
										Update
									</Button>

									<DeleteFilled
										onClick={() => {
											onDeleteTicket(elem._id);
										}}
										className={classes.icon}
									/>

									{/* <Button>Delete</Button> */}
								</Form>
							);
						})}
					</div>
					<div className={classes.headerCont}>
						<h1>Add additional tickets</h1>
					</div>
					<div className={classes.formContainer2}>
						<Form
							name="dynamic_form_nest_item"
							onFinish={onAddNewTickets}
							autoComplete="off"
						>
							<Form.List
								name="tickets"
								onFinish={(values) => {
									console.log(values);
								}}
							>
								{(fields, { add, remove }) => (
									<>
										{fields.map(
											({ key, name, ...restField }) => (
												console.log(eventId),
												(
													<Space
														key={key}
														style={{
															display: "flex",
															alignItems: "flex-end",
															marginBottom: 8,
														}}
														align="baseline"
													>
														{/* <Form.Item
											{...restField}
											name={[name, "first"]}
											rules={[
												{
													required: true,
													message: "Missing first name",
												},
											]}
										>
											<Input placeholder="First Name" />
										</Form.Item> */}

														<Form.Item
															{...restField}
															name={[name, "ticketName"]}
															rules={[
																{
																	required: true,
																	message: "Missing ticket name",
																},
															]}
															label="Name"
														>
															<Input placeholder="Ticket name" />
														</Form.Item>

														<Form.Item
															{...restField}
															name={[name, "quantity"]}
															rules={[
																{
																	required: true,
																	message: "Missing quantity",
																},
															]}
														>
															<Input
																type="number"
																placeholder="Quantity"
																style={{ width: "100px" }}
																min={1}
															/>
														</Form.Item>
														<Form.Item
															{...restField}
															name={[name, "ticketPrice"]}
															rules={[
																{
																	required: true,
																	message: "Missing price",
																},
															]}
														>
															<Input
																placeholder="Price"
																style={{ width: "100px" }}
																type="number"
																min={0}
															/>
														</Form.Item>
														<Form.Item
															className={classes.hiddenItem}
															name={[name, "event"]}
															rules={[
																{
																	required: true,
																	message: "Missing ticket event id",
																},
															]}
															initialValue={eventId}
														>
															<Input disabled />
														</Form.Item>

														<MinusCircleOutlined
															style={{
																marginBottom: 33,
															}}
															onClick={() => remove(name)}
														/>
													</Space>
												)
											)
										)}
										<Form.Item>
											<Button
												type="dashed"
												onClick={() => add()}
												block
												icon={<PlusOutlined />}
											>
												Add ticket
											</Button>
										</Form.Item>
									</>
								)}
							</Form.List>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
}

export default EventEditTickets;
