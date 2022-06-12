import React, { useState } from "react";
/*
Dodat stvari za unsubsrajbanje usera na push notifikacije
* */

const AuthContext = React.createContext({
	token: "",
	isAdmin: false,
	isLoggedIn: false,
	login: (token, uid, userRole) => {},
	logout: () => {},
	userid: undefined,
});

const retrieveToken = () => {
	const storedToken = localStorage.getItem("token");
	if (storedToken && storedToken.trim() !== "") {
		return storedToken;
	}
	return null;
};

export const AuthContextProvider = (props) => {
	const tokenData = retrieveToken();
	const retievedUserid = localStorage.getItem("userid");
	const retievedAdministrator = localStorage.getItem("isAdmin") === "true";

	const [token, setToken] = useState(tokenData);
	const [userid, setUserid] = useState(retievedUserid);
	const [isAdministrator, setIsAdministrator] = useState(retievedAdministrator);

	const userIsLoggedIN = !!token;

	const logoutHandler = async () => {
		var uId = userid;
		var uToken = token;

		localStorage.removeItem("token");
		localStorage.removeItem("userid");
		localStorage.removeItem("isAdmin");

		setToken(null);
		setUserid(undefined);
		setIsAdministrator(false);

		// window.location.assign("/login");
	};

	const loginHandler = (token, userid, userRole) => {
		const isAdmin = userRole === "admin";
		console.log("token je sad " + token);
		localStorage.setItem("token", token);
		localStorage.setItem("userid", userid);
		localStorage.setItem("isAdmin", isAdmin);
		setUserid(userid);
		setToken(token);
		setIsAdministrator(isAdmin);
	};

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIN,
		login: loginHandler,
		logout: logoutHandler,
		userid: userid,
		isAdmin: isAdministrator,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
