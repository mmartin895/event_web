import React, { useContext, useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	message,
	Select,
	DatePicker,
	AutoComplete,
} from "antd";

import classes from "./EventEditGeneral.module.scss";
import moment from "moment";
import EventEditMenu from "../EventEditMenu/EventEditMenu";

import {
	addEvent,
	addEventWithPoster,
	getEvent,
	updateEventGeneralInfo,
} from "../../../../services/EventService";
import AuthContext from "../../../../store/auth-context2";
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

const config = {
	rules: [
		{
			type: "object",
			required: true,
			message: "Please select time!",
		},
	],
};

const EventEditGeneral = () => {
	const authCtx = useContext(AuthContext);

	const eventId = useParams().id;

	const [eventState, setEventState] = useState({});
	const [form] = Form.useForm();

	const getTicketsInfo = (eventId) => {
		getEvent(eventId).then((data) => {
			// console.log(Object.keys(data));
			data.startTime = moment(data.startTime);
			data.endTime = moment(data.endTime);

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

		if (new Date(values.event.startTime) > new Date(values.event.endTime)) {
			message.error("Event must start before it ends!");
			return;
		}

		try {
			const data = await updateEventGeneralInfo(values, authCtx.token);
			console.log(data);
			message.success(data);
		} catch (err) {
			message.error(err.response.status + " " + err.response.data);
			console.log(err);
			console.log(err.message);
			if (err.response.status == 403 || err.response.status == 401) {
				authCtx.logout();
			}
		}
	};

	const [value, setValue] = useState("");
	const [options, setOptions] = useState([]);
	const [source, setSource] = useState([
		{ value: "Zadar" },
		{ value: "Zagreb" },
		{ value: "Pula" },
		{ value: "Varaždin" },
		{ value: "Split" },
	]);

	const onSearch = (searchText) => {
		const newOpt = source.filter((elem) =>
			elem.value.toLowerCase().startsWith(searchText.toLowerCase())
		);

		setOptions(!searchText ? [] : newOpt);
	};

	const onSelect = (data) => {
		console.log("onSelect", data);
	};

	const onChange = (data) => {
		setValue(data);
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
					<h1>Update event info</h1>

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
							name={["event", "name"]}
							label="Name"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input />
						</Form.Item>
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
						<Form.Item
							name={["event", "eventType"]}
							label="Event type"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Select>
								<Select.Option value="Koncert">Koncert</Select.Option>
								<Select.Option value="Kazaliste">Kazaliste</Select.Option>
								<Select.Option value="Izlozba">Izlozba</Select.Option>
								<Select.Option value="Degustacija">Degustacija</Select.Option>
								<Select.Option value="Festival">Festival</Select.Option>
								<Select.Option value="Konferencija">Konferencija</Select.Option>
								<Select.Option value="Party">Party</Select.Option>
								<Select.Option value="Sportski">Sportski</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							name={["event", "location"]}
							label="Location"
							rules={[
								{
									required: true,
								},
							]}
						>
							<AutoComplete
								options={options}
								value={value}
								onSelect={onSelect}
								onSearch={onSearch}
								onChange={onChange}
							/>
						</Form.Item>
						<Form.Item name={["event", "description"]} label="Description">
							<Input.TextArea
								style={{
									height: 120,
								}}
							/>
						</Form.Item>
						<Form.Item
							name={["event", "startTime"]}
							label="Start time"
							{...config}
						>
							<DatePicker showTime format="YYYY-MM-DD HH:mm" />
						</Form.Item>
						<Form.Item name={["event", "endTime"]} label="End time" {...config}>
							<DatePicker showTime format="YYYY-MM-DD HH:mm" />
						</Form.Item>

						<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
							<Button type="primary" htmlType="submit">
								Update
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};

export default EventEditGeneral;
