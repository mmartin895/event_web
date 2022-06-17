import React, { useContext, useState } from "react";
import { LockOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";

import classes from "./Login.module.scss";
import {
	loginUser,
	subscribeUserForPushNotfications,
} from "../../services/AuthSevices";
import AuthContext from "../../store/auth-context2";
import { useNavigate } from "react-router-dom";
import { subscribeUser } from "./../../service-worker-subscription";

function Login(props) {
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
		try {
			const data = await loginUser(values);
			authCtx.login(data.token, data.user.email, data.user.userRole);
			console.log(data);
			registerSubscription(data.token);
			navigate("/home");
		} catch (err) {
			console.log(err);
			updateError(err.response.data.error);
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
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
						]}
					>
						<Input prefix={<InboxOutlined />} placeholder="Email" />
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
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							Log in
						</Button>
					</Form.Item>
					{responseError && (
						<Alert message={responseError} type="error" showIcon />
					)}
					Or <a href="/register">register now!</a>
				</Form>
			</div>
		</div>
	);
}

export default Login;
