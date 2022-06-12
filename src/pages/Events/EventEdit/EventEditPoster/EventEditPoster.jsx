import React, { useContext, useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	message,
	Select,
	DatePicker,
	Upload,
	AutoComplete,
	Space,
	InputNumber,
} from "antd";
import {
	UploadOutlined,
	InboxOutlined,
	MinusCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";

import classes from "./EventEditPoster.module.scss";

import {
	addEvent,
	addEventWithPoster,
	getEvent,
	updateEventPoster,
} from "../../../../services/EventService";
import Navigation from "../../../Common/Navigation";
import AuthContext from "../../../../store/auth-context2";
import { useParams } from "react-router-dom";
import default_image from "../../../../assets/large.jpg";
import EventEditMenu from "../EventEditMenu/EventEditMenu";

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

const EventEditPoster = () => {
	const authCtx = useContext(AuthContext);

	const eventId = useParams().id;

	const [form] = Form.useForm();

	const [eventState, setEventState] = useState({});

	const setPoster = () => {
		getEvent(eventId).then((event) => {
			console.log(Object.keys(event));
			setEventState(event);
		});
	};

	useEffect(() => {
		setPoster();
	}, []);

	const onEditPoster = async (values) => {
		const event = values.event;
		console.log("Ovo su vrijednosti \n", values);
		if (!values.event.cover_poster) {
			message.error("Please select event poster!");
			return;
		}

		const formData = new FormData();
		for (const name in event) {
			formData.append(name, event[name]); // there should be values.avatar which is a File object
		}
		formData.append("_id", eventId);

		try {
			const data = await updateEventPoster(formData, authCtx.token);
			console.log(data);
			message.success(data);
			setPoster();
		} catch (err) {
			message.error(err.response.status + " " + err.response.data);
			if (err.response.status == 401 || err.response.status == 403) {
				authCtx.logout();
			}
			console.log(err);
			console.log(err.message);
		}
	};

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

	const onSelect = (data) => {
		console.log("onSelect", data);
	};

	const onChange = (data) => {};

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
				<div>
					<div className={classes.titleContainer}>
						<h1>Upade event poster</h1>
						<img src={eventState.img ? eventState.img : default_image}></img>
					</div>
					<div className={classes.formContainer}>
						<Form
							{...layout}
							name="nest-messages"
							onFinish={onEditPoster}
							validateMessages={validateMessages}
						>
							<Form.Item
								name={["event", "cover_poster"]}
								label="Upload"
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
									Update event cover
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default EventEditPoster;
