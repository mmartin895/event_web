import React, { useContext, useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	message,
} from "antd";

import classes from "./EventNotification.module.scss";
import EventEditMenu from "../EventEdit/EventEditMenu/EventEditMenu";

import {
	getEvent,
} from "../../../services/EventService";
import AuthContext from "../../../store/auth-context2";
import { useParams } from "react-router-dom";

const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not a valid email!",
		number: "${label} is not a valid number!",
	},
	number: {
		range: "${label} must be between ${min} and ${max}",
	},
};


const EventNotification = () => {
	const authCtx = useContext(AuthContext);

	const eventId = useParams().id;

	const [eventState, setEventState] = useState({});
	const [form] = Form.useForm();

	const getTicketsInfo = (eventId) => {
		getEvent(eventId).then((data) => {
			// console.log(Object.keys(data));

			setEventState({ event: data });
			form.setFieldsValue({ event: data });
		});
	};

	useEffect(() => {
		getTicketsInfo(eventId);
	}, []);

	const onFinishWithPoster = async (values) => {
		const event = values.event;

		console.log("Ovo su vrijednosti \n", values);

		try {
			// const data = await updateEventGeneralInfo(values, authCtx.token);
			// console.log(data);
			// message.success(data);
		} catch (err) {
			message.error(err.response.status + " " + err.response.data);
			console.log(err);
			console.log(err.message);
			if (err.response.status == 403 || err.response.status == 401) {
				authCtx.logout();
			}
		}
	};

	const layout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 12,
		},
	};

	return (
		<>
			<div className={classes.flexRow}>
				<EventEditMenu className={classes.menu}></EventEditMenu>
				<div className={classes.formContainer}>
					<h1>Notify event attendes</h1>
					<Form
						form={form}
						setField={eventState}
						setFieldsValue={eventState}
						{...layout}
						name="nest-messages"
						onFinish={onFinishWithPoster}
						validateMessages={validateMessages}
					>
						<Form.Item
							name={["event", "_id"]}
							label="Id"
							rules={[
								{
									required: true,
								},
							]}
							className={classes.id}
						>
							<Input disabled />
						</Form.Item>
						<Form.Item name={["event", "notification"]} label="Enter notification">
							<Input.TextArea
								style={{
									height: 150,
									
								}}
							/>
						</Form.Item>
						<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
							<Button type="primary" htmlType="submit">
								Notify attendes
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};

export default EventNotification;
