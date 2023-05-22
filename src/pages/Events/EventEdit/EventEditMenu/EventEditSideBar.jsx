import { Menu } from "antd";
import React, { useState } from "react";

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
	HomeOutlined,
	PictureOutlined,
	InfoCircleOutlined,
	TagsOutlined,
	MenuOutlined,
	CloseOutlined,
} from "@ant-design/icons";
// import classes from "./EventEditSideBar.module.scss";

import { Button, Drawer } from "antd";

import "./EventEditSideBar.scss";
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

function getItemWithoutIcon(label, key, children, type) {
	return {
		key,
		children,
		label,
		type,
	};
}

function EventEditSideBar(props) {
	const title = <h1>EventUpp</h1>;

	const eventId = useParams().id;
	const url = "/myevents/" + eventId + "/";

	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState("left");
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const onChange = (e) => {
		setPlacement(e.target.value);
	};
	const navigate = useNavigate();

	const items = [
		getItemWithoutIcon(
			<span
				onClick={() => {
					showDrawer();
				}}
			>
				<MenuOutlined
					onClick={() => {
						showDrawer();
					}}
				/>
			</span>,

			"sub14",
			[]
		),
		getItemWithoutIcon(
			<h1
				style={{ color: "white" }}
				onClick={() => {
					navigate("/home");
				}}
			>
				{"EventUpp"}
			</h1>,

			"sub13",
			[]
		),
	];

	return (
		<>
			<div className="sideDrawerDiv">
				<Menu
					className={"sideBarMenu ant-menu-item-active ant-menu-item"}
					items={items}
					mode="horizontal"
					color="dark"
					theme="dark"
					onClick={(e) => {}}
				></Menu>
				<Drawer
					title={<h2 className="drawerHeader">{"Edit event info"}</h2>}
					placement={"left"}
					closable={true}
					onClose={onClose}
					className={"drawerStyle"}
					open={open}
					key={placement}
					visible={open}
					color="dark"
					theme="dark"
					closeIcon={<MenuFoldOutlined></MenuFoldOutlined>}
					// headerStyle={{
					// 	height: "110px",
					// 	display: "flex",
					// 	"justify-content": "flex-end",
					// 	"align-items": "center",
					// 	// h2:{
					// 	//     "padding-top":"5px"
					// 	// }
					// 	// "flex-direction": "column",
					// 	// "background-color": "blue",

					// 	"line-height": "30vw",
					// 	lineHeightLG: "10",
					// }}

					footer={
						<div className="draweFooter">
							<Link to="/home">
								<p className="sideBarParagraph">
									<span>
										<HomeOutlined></HomeOutlined>
									</span>
									<h2>Home</h2>
								</p>
							</Link>

							<p
								className="sideBarParagraph"
								onClick={() => {
									onClose();
								}}
							>
								<span>
									<CloseOutlined />
								</span>
								<h2>Close</h2>
							</p>
						</div>
					}
				>
					<h1 className="eventNameHeader">{props.eventName}</h1>

					<Link to={"/myevents"}>
						<p className="sideBarParagraph">
							<span>
								<RollbackOutlined></RollbackOutlined>
							</span>
							<h2>Overview</h2>
						</p>
					</Link>
					<Link to={url + "general"}>
						<p className="sideBarParagraph">
							<span>
								<InfoCircleOutlined></InfoCircleOutlined>
							</span>

							<h2>General info</h2>
						</p>
					</Link>

					<Link to={url + "tickets"}>
						<p className="sideBarParagraph">
							<span>
								<TagsOutlined></TagsOutlined>
							</span>

							<h2>Tickets</h2>
						</p>
					</Link>

					<Link to={url + "poster"}>
						<p className="sideBarParagraph">
							<span>
								<PictureOutlined></PictureOutlined>
							</span>
							<h2>Event poster</h2>
						</p>
					</Link>

					<Link to={url + "notify"}>
						<p className="sideBarParagraph">
							<span>
								<NotificationOutlined></NotificationOutlined>
							</span>
							<h2>Notify attendees</h2>
						</p>
					</Link>
				</Drawer>
			</div>
		</>
	);
}

export default EventEditSideBar;
