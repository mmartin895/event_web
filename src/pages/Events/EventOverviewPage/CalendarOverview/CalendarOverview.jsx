import React from "react";
import { Badge, Calendar } from "antd";
import moment from "moment";
import default_image from "../../../../assets/default_image.png";
import "./CalendarOverview.scss";
import { toContainHTML } from "@testing-library/jest-dom/dist/matchers";
import { useNavigate } from "react-router-dom";

const areDatesEqual = (date1, date2) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

const areMonthsEqual = (date1, date2) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth()
	);
};

const getDailyData = (events, value) => {
	var eventsForDate = events
		.filter((event) => {
			return areDatesEqual(new Date(event.startTime), new Date(value));
		})
		.map((event) => {
			const { name, thumbnail, startTime, _id } = event;
			return { name, thumbnail: thumbnail ?? default_image, startTime, _id };
		});

	return eventsForDate || [];
};

const getMonthlyData = (events, value) => {
	var eventsForDate = events
		.filter((event) => {
			return areMonthsEqual(new Date(event.startTime), new Date(value));
		})
		.map((event) => {
			const { name, thumbnail, startTime, _id } = event;
			return { name, thumbnail: thumbnail ?? default_image, startTime, _id };
		});

	return eventsForDate || [];
};

function CalendarOverview(props) {
	const events = props.searchedEvents;
	const navigate = useNavigate();

	const dateCellRender = (value) => {
		const listData = getDailyData(events, value);
		return (
			<ul className="events">
				{listData.map((event) => (
					<li
						className="listItem"
						key={event._id}
						onClick={() => {
							navigate(`/myevents/${event._id}/general`);
						}}
					>
						<Badge status="success" text={event.name} />
						{/* <img
							style={{ height: 30, width: 30, objectFit: "contain" ,marginRight:5}}
							src={event.thumbnail}
						></img>
						<span>{event.name} </span> */}
					</li>
				))}
			</ul>
		);
	};

	const monthCellRender = (value) => {
		const listData = getMonthlyData(events, value);
		return (
			<ul className="events">
				{listData.map((event) => (
					<li
						className="listItem"
						key={event._id}
						onClick={() => {
							navigate(`/myevents/${event._id}/general`);
						}}
					>
						<Badge status="success" text={event.name} />
					</li>
				))}
			</ul>
		);
	};

	return (
		<Calendar
			defaultValue={props.defaultValue}
			monthCellRender={monthCellRender}
			dateCellRender={dateCellRender}
		/>
	);
}

export default CalendarOverview;
