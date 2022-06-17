import React, { useState, useContext } from "react";
import { LockOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";

import classes from "./Registration.module.scss";
import {
	registerUser,
	subscribeUserForPushNotfications,
} from "../../services/AuthSevices";
import AuthContext from "../../store/auth-context2";
import { useNavigate } from "react-router-dom";
import { subscribeUser } from "../../service-worker-subscription";

function Registration(props) {
	const [responseError, setResponseError] = useState(null);
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const updateError = (message) => {
		setResponseError(message);
		setTimeout(() => {
			setResponseError(null);
		}, 2000);
	};

	const registerSubscription = async (token) => {
		const ps = await subscribeUser();
		subscribeUserForPushNotfications(ps, token);
		console.log(ps);
	};

	const onFinish = async (values) => {
		if (values.passwd !== values.passwd2) {
			updateError("Passwords don't match!");
		} else {
			try {
				const data = await registerUser(values);
				authCtx.login(data.token, data.user.email, data.user.userRole);
				console.log(data);
				registerSubscription(data.token);
				navigate("/home");
			} catch (err) {
				updateError(err.response.data.error);
			}
		}
	};

	return (
		<div className={classes.flex_container}>
			<div className={classes.login_container}>
				<h1>FiestApp</h1>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
				>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="First name"
						/>
					</Form.Item>
					<Form.Item
						name="lastName"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Last name"
						/>
					</Form.Item>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
						]}
					>
						<Input
							prefix={<InboxOutlined className="site-form-item-icon" />}
							placeholder="Email"
						/>
					</Form.Item>
					<Form.Item
						name="passwd"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item
						name="passwd2"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Repeat password"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							Register
						</Button>
					</Form.Item>
					{responseError && (
						<Alert message={responseError} type="error" showIcon />
					)}
					Or <a href="/login">log in!</a>
				</Form>
			</div>
		</div>
	);
}

export default Registration;
