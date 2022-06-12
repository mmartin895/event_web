import React, { useContext, useState } from "react";
import { Menu, Switch } from "antd";
import {
	MailOutlined,
	AppstoreOutlined,
	SettingOutlined,
	SearchOutlined,
	BookOutlined,
	HomeOutlined,
	LogoutOutlined,
	LoginOutlined,
	UsergroupAddOutlined,
	HighlightOutlined,
	BulbOutlined,
	UserOutlined,
	WalletOutlined,
} from "@ant-design/icons";
import AuthContext from "../../store/auth-context2";
import { Link } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import classes from "./Navigation.module.scss";

function getItem(label, key, icon = "", children, type) {
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

const Navigation = () => {
	const authCtx = useContext(AuthContext);
	const logOutButton = (
		<span
			onClick={() => {
				console.log("U tried to log out");
				authCtx.logout();
			}}
		>
			Log out
		</span>
	);

	const title = <h1>EventUpp</h1>;

	const editFiels = authCtx.isAdmin
		? [
				getItem(
					<Link to="/myevents">My events</Link>,
					"sub1",
					<WalletOutlined />
				),
				getItem(
					<Link to="/admin">Admin</Link>,
					"sub19",
					<UsergroupAddOutlined />
				),
		  ]
		: [
				getItem(
					<Link to="/myevents">My events</Link>,
					"sub1",
					<WalletOutlined />
				),
		  ];

	const firstItem = authCtx.isLoggedIn
		? [
				getItem(logOutButton, "sub1", <LogoutOutlined />),
				getItem(authCtx.userid, "sub9", <UserOutlined />, editFiels),
		  ]
		: [
				getItem(<Link to="/login">Log in</Link>, "sub11", <LoginOutlined />),
				getItem(
					<Link to="/register">Register</Link>,
					"sub12",
					<HighlightOutlined />
				),
		  ];

	const items = [
		getItemWithoutIcon(title, "sub13", []),
		getItem(<Link to="/home">Home</Link>, "sub21", <HomeOutlined />),

		getItem(
			<Link to="/search">Find your next event</Link>,
			"sub2",
			<SearchOutlined />
		),
		getItem(
			<Link to="/organize">Organize an event</Link>,
			"sub14",
			<BulbOutlined />
		),
		...firstItem,
	];

	const [theme, setTheme] = useState("dark");
	const [current, setCurrent] = useState("1");

	const changeTheme = (value) => {
		setTheme(value ? "dark" : "light");
	};

	const onClick = (e) => {
		console.log("click ", e);
		setCurrent(e.key);
	};

	return (
		<>
			<Menu
				mode="horizontal"
				theme={"dark"}
				onClick={onClick}
				className={classes.menu}
				defaultOpenKeys={["sub1"]}
				selectedKeys={[current]}
				items={items}
			/>
		</>
	);
};

export default Navigation;
