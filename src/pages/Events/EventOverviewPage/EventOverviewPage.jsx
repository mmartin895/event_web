import React, { useContext, useEffect, useState } from "react";
import { deleteEvent, getPersonalEvents } from "../../../services/EventService";
import AuthContext from "../../../store/auth-context2";
import classes from "./EventOverviewPage.module.scss";
import default_image from "../../../assets/default_image.png";
import { DeleteFilled, LinkOutlined, EditOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, Avatar, Input, message } from "antd";
import Navigation from "../../Common/Navigation";

const { Search } = Input;

function EventOverviewPage(props) {
	const navigate = useNavigate();

	function padTo2Digits(num) {
		return num.toString().padStart(2, "0");
	}

	function formatDate(date) {
		return [
			padTo2Digits(date.getDate()),
			padTo2Digits(date.getMonth() + 1),
			date.getFullYear(),
		].join(".");
	}

	const eventDelete = async (token, { _id, organizer }) => {
		try {
			const data = await deleteEvent(token, { _id, organizer });
			console.log(data);
			message.success(data.message);
			fetchAndSetEvents();
		} catch (err) {
			message.error(err.message);
			if (err.response.status == 403 || err.response.status == 401) {
				console.log("Token \n", authCtx.token);
				authCtx.logout();
			}
			console.log(err);
		}
	};

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

	const authCtx = useContext(AuthContext);

	const [personalEvents, setPersonalEvents] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState([]);

	const filterItems = (value, event) => {
		const filteredEvents = personalEvents.filter(({ name }) => {
			const lowerName = name.toLowerCase();
			const lowerValue = value.toLowerCase();

			return lowerName.indexOf(lowerValue) >= 0;
		});
		setFilteredEvents(filteredEvents);
	};

	const fetchAndSetEvents = () => {
		getPersonalEvents(authCtx.token)
			.then((data) => {
				setPersonalEvents(data.events);
				setFilteredEvents(data.events);

				console.log(data.events?.length);
			})
			.catch((err) => {
				console.log(err.message);
				console.log(err);
				console.log(err.response.status);
				if (err.response.status == 403 || err.response.status == 401) {
					authCtx.logout();
				}
			});
	};

	useEffect(() => {
		fetchAndSetEvents();
	}, []);

	return (
		<>
			<Navigation></Navigation>
			<div className={classes.titleContainer}>
				<h1>My events</h1>
			</div>
			<div className={classes.searchContainer}>
				<Search
					size="large"
					placeholder="Search event name"
					onSearch={filterItems}
					style={{ width: "40%" }}
				/>
			</div>
			<div className={classes.eventListContainer}>
				{filteredEvents.map((event) => {
					return (
						<div className={classes.eventListItem} key={event._id}>
							<img src={event.thumbnail ?? default_image}></img>
							<h3>{event.name}</h3>
							<div className={classes.dateWrapper}>
								<p>{formatDate(new Date(event.startTime))}</p>
								<span>{fomatDateToDayTime(new Date(event.startTime))}</span>
							</div>
							<div className={classes.iconContainer}>
								<button
									onClick={() => {
										console.log("edit ", event._id);
										navigate(`/myevents/${event._id}/general`);
									}}
								>
									<EditOutlined className={classes.edit} />
								</button>
								<button
									onClick={() => {
										console.log("Organizator je ", event.organizer);
										eventDelete(authCtx.token, {
											_id: event._id,
											organizer: event.organizer,
										});
									}}
								>
									<DeleteFilled className={classes.delete} />
								</button>
								<button
									onClick={() => {
										navigate(`/events/${event._id}`);
									}}
								>
									<LinkOutlined className={classes.edit} />
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className={classes.calendarListContainer}></div>
		</>
	);
}

export default EventOverviewPage;
