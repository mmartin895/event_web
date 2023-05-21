import React, { useContext, useEffect, useState } from "react";
import { deleteEvent, getPersonalEvents } from "../../../services/EventService";
import AuthContext from "../../../store/auth-context2";
import classes from "./EventOverviewPage.module.scss";
import default_image from "../../../assets/default_image.png";
import { DeleteFilled, LinkOutlined, EditOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, Avatar, Input, message, Button } from "antd";
import Navigation from "../../Common/Navigation";
import CalendarOverview from "./CalendarOverview/CalendarOverview";
import moment from "moment";

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
	const [isList, setIsList] = useState(true);

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
					className={classes.searchInputContainer}
					size="large"
					placeholder="Search event name"
					onSearch={filterItems}
				/>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						onClick={() => {
							setIsList(true);
						}}
					>
						List
					</Button>
					<Button
						className={classes.button}
						onClick={() => {
							setIsList(false);
						}}
					>
						Calendar
					</Button>
				</div>
			</div>
			{isList && (
				<div className={classes.eventListContainer}>
					{filteredEvents.map((event) => {
						return (
							<div className={classes.eventListItem} key={event._id}>
								<img src={event.thumbnail ?? default_image}></img>
								<div className={classes.eventListItemInfo}>
									<h3>{event.name}</h3>
									<div className={classes.dateWrapper}>
										<p>{formatDate(new Date(event.startTime))}</p>
										<span>{fomatDateToDayTime(new Date(event.startTime))}</span>
									</div>
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
			)}
			{!isList && (
				<div className={classes.calendarListContainer}>
					<CalendarOverview
						searchedEvents={filteredEvents}
						defaultValue={moment()}
					></CalendarOverview>
				</div>
			)}
		</>
	);
}

export default EventOverviewPage;
