import React, { useContext, useEffect, useRef, useState } from "react";
import {
	Card,
	Avatar,
	Form,
	Input,
	Button,
	Radio,
	Select,
	Cascader,
	DatePicker,
	InputNumber,
	TreeSelect,
	Switch,
	Space,
	AutoComplete,
	message,
} from "antd";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
	PushpinOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";

import classes from "./EventSerachPage.module.scss";
import {
	getAllEvents,
	searchEvents,
	cutNameIfGreater,
} from "../../../services/EventService";
import default_image from "../../../assets/default_image.png";
import Navigation from "../../Common/Navigation";
import AuthContext from "../../../store/auth-context2";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Meta } = Card;
const { Search } = Input;
const { RangePicker } = DatePicker;

const fomatDate = (d) => {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = {
		0: "Jan",
		1: "Feb",
		2: "Mar",
		3: "Apr",
		4: "May",
		5: "Jun",
		6: "Jul",
		7: "Aug",
		8: "Sep",
		9: "Oct",
		10: "Nov",
		11: "Dec",
	};

	var datestring =
		" " +
		days[d.getDay()] +
		", " +
		months[d.getMonth() + 1] +
		" " +
		d.getDate() +
		", " +
		// d.getFullYear() +
		// " " +
		d.getHours() +
		":" +
		d.getMinutes();
	return datestring;
};

function EventSerachPage(props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchItem = searchParams.get("s");
	const initialValues = { name: searchItem ?? undefined };

	const [eventsState, setEventsState] = useState([]);
	const navigate = useNavigate();
	const [isPortait, setIsPortait] = useState(
		window.innerWidth < window.innerHeight
	);
	const isPortaitRef = useRef(isPortait);

	const onFinishEventSearch = async (values) => {
		try {
			const data = await searchEvents(values);
			// console.log(data.events);
			setEventsState(data.events);
		} catch (err) {
			message.error(err.message);
			console.log(err.message);
		}
	};

	useEffect(() => {
		console.log(" ide use effect");
		searchEvents(initialValues).then((data) => {
			setEventsState(data.events);
			// console.log(data.events[data.events.length - 1].thumbnail);
		});
	}, []);

	window.addEventListener("resize", (event) => {
		let isPort = window.innerWidth < window.innerHeight;
		// if (isPortaitRef.current != isPort) {
		// 	console.log("It s true");
		// 	setIsPortait(isPort);
		// }
		setIsPortait(window.innerWidth < window.innerHeight);
	});

	return (
		<>
			<Navigation></Navigation>
			<div className={classes.searchContainer}>
				<h1>Find events that interest you</h1>
				<div className={classes.formContainer}>
					<Form
						className={classes.form}
						onFinish={onFinishEventSearch}
						initialValues={initialValues}
					>
						<Form.Item label="Name" name="name">
							<Input placeholder="Event name" />
						</Form.Item>
						<Form.Item label="Select" name="eventType">
							<Select placeholder="Event type">
								<Select.Option value={undefined}>Any</Select.Option>
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
						<Form.Item name="location" label="Location">
							<AutoComplete
								style={{
									width: 200,
								}}
								placeholder="Event location"
							/>
						</Form.Item>
						<Form.Item label="Event date range" name="date_range">
							<RangePicker />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>

			<div className={classes.outputContainer}>
				<div className={classes.cardCointainer}>
					{eventsState.map((element) => {
						return (
							// <Card
							// 	// key={element._id}
							// 	onClick={() => {
							// 		console.log(element._id);
							// 		navigate(`/events/${element._id}`);
							// 	}}
							// 	className={classes.card}
							// 	hoverable
							// cover={
							// 	<img alt="example" src={element.thumbnail ?? default_image} />
							// }
							// >
							// <h2>{cutNameIfGreater(element.name)}</h2>
							// <p>
							// 	<PushpinOutlined /> {element.location}
							// </p>
							// <p>
							// 	<ClockCircleOutlined />
							// 	<span className={classes.date}>
							// 		{fomatDate(new Date(element.startTime))}
							// 	</span>
							// </p>
							// <p>
							// 	<ClockCircleOutlined />
							// 	<span className={classes.date}>
							// 		{fomatDate(new Date(element.endTime))}
							// 	</span>
							// </p>
							// <p>{element.eventType}</p>
							// </Card>

							<Card
								hoverable
								className={classes.card2}
								style={{
									display: "flex",
								}}
								cover={
									<img
										alt="example"
										className={classes.cardImage}
										src={element.thumbnail ?? default_image}
									/>
								}
								onClick={() => {
									console.log(element._id);
									navigate(`/events/${element._id}`);
								}}
							>
								<h3>{cutNameIfGreater(element.name)}</h3>
								<p>
									<PushpinOutlined /> {element.location}
								</p>
								<p>
									<ClockCircleOutlined />
									<span className={classes.date}>
										{fomatDate(new Date(element.startTime))}
									</span>
								</p>
								<p>{element.eventType}</p>
							</Card>
						);
					})}
				</div>
				<div className={classes.mapCointainer}>mapa</div>
			</div>
		</>
	);
}

export default EventSerachPage;
