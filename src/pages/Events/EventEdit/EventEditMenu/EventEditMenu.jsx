import React, { useContext, useState } from "react";
import classes from "./EventEditMenu.module.scss";
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	NotificationOutlined,
	PieChartOutlined,
	UnorderedListOutlined,
	RollbackOutlined,
	PictureOutlined,
	InfoCircleOutlined,
	TagsOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import AuthContext from "../../../../store/auth-context2";
import { Link, useNavigate, useParams } from "react-router-dom";

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

function EventEditMenu(props) {
	const authCtx = useContext(AuthContext);

	const navigate = useNavigate();
	const eventId = useParams().id;

	const url = "/myevents/" + eventId + "/";
	///

	const items = [
		getItem(
			<Link to="/home">
				<h1 style={{ color: "white" }} onClick>
					Eventup
				</h1>
			</Link>,

			"4"
		),
		getItem(<Link to="/myevents">Overview</Link>, "5", <RollbackOutlined />),
		getItem(
			<Link to={url + "general"}>General info</Link>,
			"1",
			<InfoCircleOutlined />
		),

		getItem(<Link to={url + "tickets"}>Tickets</Link>, "2", <TagsOutlined />),
		getItem(
			<Link to={url + "poster"}>Event poster</Link>,
			"3",
			<PictureOutlined />
		),
		getItem(
			<Link to={url + "notify"}>Notify attendes</Link>,
			"sub2",
			<NotificationOutlined />
		),
	];

	return (
		<div>
			<Menu items={items} mode="vertical" color="dark" theme="dark"></Menu>
		</div>
	);
}

export default EventEditMenu;
