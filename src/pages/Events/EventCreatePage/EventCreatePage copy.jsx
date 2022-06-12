import React, { useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	message,
	Select,
	DatePicker,
	Upload,
	AutoComplete,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import classes from "./EventCreatePage.module.scss";

import { addEvent, addEventWithPoster } from "../../../services/EventService";

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 16,
	},
};
/* eslint-disable no-template-curly-in-string */

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
/* eslint-enable no-template-curly-in-string */

const config = {
	rules: [
		{
			type: "object",
			required: true,
			message: "Please select time!",
		},
	],
};

const EventCreatePage = () => {
	useEffect(() => {
		console.log("ide gaaaaaaas");
	}, []);

	const onFinish = async (values) => {
		console.log(values);
		try {
			const createdEvent = await addEvent(values);
			console.log(createdEvent);
		} catch (err) {
			console.log(err);
			console.log(err.message);
		}
	};

	const onFinishWithPoster = async (values) => {
		const event = values.event;
		console.log(event);
		const formData = new FormData();
		for (const name in event) {
			formData.append(name, event[name]); // there should be values.avatar which is a File object
		}

		try {
			const createdEvent = await addEventWithPoster(formData);
			console.log(createdEvent);
		} catch (err) {
			console.log(err);
			console.log(err.message);
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

	const [image, setImage] = useState([]);

	///////////////////////////////////////////////////////////////////////////
	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}

		const isLt2M = file.size / 1024 / 1024 < 2;

		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
		}

		return isJpgOrPng && isLt2M;
	};

	//////////////////
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(img);
	};
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();

	const handleChange = (info) => {
		console.log(info.event);
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}

		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};
	////////////////////////////////////////////////////////////////////////////

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

	const normFile = (e) => {
		console.log(Object.keys(e));
		console.log("==============");

		console.log(e.file.originFileObj);

		console.log("Upload event:");
		console.log(e);

		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	const normFile2 = (e) => {
		console.log(e.file?.status);
		if (e) {
			return e.file?.status !== "removed" ? e.file.originFileObj : undefined;
		}
		return undefined;
	};

	return (
		<div className={classes.formContainer}>
			<Form
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
						style={{
							width: 200,
						}}
						onSelect={onSelect}
						onSearch={onSearch}
						onChange={onChange}
						placeholder="control mode"
					/>
					{/* <Input /> */}
				</Form.Item>
				<Form.Item name={["event", "description"]} label="Description">
					<Input.TextArea />
				</Form.Item>
				<Form.Item name={["event", "startTime"]} label="Start time" {...config}>
					<DatePicker showTime format="YYYY-MM-DD HH:mm" />
				</Form.Item>
				<Form.Item name={["event", "endTime"]} label="End time" {...config}>
					<DatePicker showTime format="YYYY-MM-DD HH:mm" />
				</Form.Item>

				<Form.Item
					name={["event", "cover_poster"]}
					label="Upload"
					// valuePropName="DOYOUNOTICE"
					// getValueFromEvent={({ file }) => file.originFileObj}

					// valuePropName="fileList"
					valuePropName="fileList2222"
					getValueFromEvent={normFile2}
					extra="Upload event cover"
				>
					<Upload
						onChange={handleChange}
						name="event_psoter"
						maxCount={1}
						listType="picture"
						customRequest={dummyRequest}
						beforeUpload={beforeUpload}
						onRemove={() => {
							console.log("you clicked remove");
						}}
					>
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default EventCreatePage;
