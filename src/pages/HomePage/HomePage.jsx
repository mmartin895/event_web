import React, { useContext, useEffect, useState } from "react";
import { Card, Avatar, Input } from "antd";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
	PushpinOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";

import classes from "./HomePage.module.scss";
import { getAllEvents } from "../../services/EventService";
import default_image from "../../assets/default_image.png";
import Navigation from "../Common/Navigation";
import AuthContext from "../../store/auth-context2";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Search } = Input;

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

function HomePage(props) {
	
	const [eventsState, setEventsState] = useState([]);
	const navigate = useNavigate();
	const [isPortait, setIsPortait] = useState(
		window.innerWidth < window.innerHeight
	);

	const onSearch = (value) => {
		console.log(value);
		navigate(`/search?s=${value}`);
	};

	useEffect(() => {
		console.log(" ide use effect");
		getAllEvents().then((data) => {
			setEventsState(data.events);
			// console.log(data.events[data.events.length - 1].thumbnail);
		});
	}, []);

	// window.addEventListener("resize", (event) => {
	// 	console.log(event);
	// 	console.log(window.innerWidth < window.innerHeight);
	// });

	return (
		<>
			<Navigation></Navigation>

			<div className={classes.latestContainer}>
				<div className={classes.search}>
					<Search placeholder="Search events" size="large" onSearch={onSearch} />
				</div>

				<h1>Latest events</h1>
				<div className={classes.cardCointainer}>
					{eventsState.map((element) => {
						return (
							<Card
								// key={element._id}
								onClick={() => {
									console.log(element._id);
									navigate(`/events/${element._id}`);
								}}
								className={classes.card}
								hoverable
								cover={
									<img alt="example" src={element.thumbnail ?? default_image} />
								}
							>
								<h2>{element.name}</h2>
								<p>
									<PushpinOutlined /> {element.location}
								</p>
								<p>
									<ClockCircleOutlined />
									<span className={classes.date}>
										{fomatDate(new Date(element.startTime))}
									</span>
								</p>
								<p>
									<ClockCircleOutlined />
									<span className={classes.date}>
										{fomatDate(new Date(element.endTime))}
									</span>
								</p>
								<p>{element.eventType}</p>
							</Card>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default HomePage;
