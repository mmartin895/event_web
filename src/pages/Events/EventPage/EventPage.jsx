import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../../services/EventService";

import default_image from "../../../assets/large.jpg";
import classes from "./EventPage.module.scss";

function EventPage(props) {
	const { id } = useParams();
	const [eventState, setEventState] = useState({});
	useEffect(() => {
		getEvent(id).then((event) => {
			console.log(event);
			setEventState(event);
		});
	}, []);
	return (
		<div>
			<div className={classes.imageContainer}>
				<img src={eventState.img ? eventState.img : default_image}></img>
			</div>
			<div className={classes.eventDescriptionContainer}>
				<h1>{eventState.name}</h1>
				<h3>{eventState.location}</h3>
				<p>{eventState.description}</p>
			</div>
		</div>
	);
}

export default EventPage;
