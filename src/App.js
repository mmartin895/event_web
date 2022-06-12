import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EventCreatePage from "./pages/Events/EventCreatePage/EventCreatePage";
import EventCreatePageND from "./pages/Events/EventCreatePage/EventCreatePageND";

import EventEditPoster from "./pages/Events/EventEdit/EventEditPoster/EventEditPoster";
import EventEditGeneral from "./pages/Events/EventEdit/EventEditGeneral/EventEditGeneral";
import EventEditTickets from "./pages/Events/EventEdit/EventEditTickets/EventEditTickets";

import EventOverviewPage from "./pages/Events/EventOverviewPage/EventOverviewPage";
import EventPage from "./pages/Events/EventPage/EventPage";
import EventSerachPage from "./pages/Events/EventSerachPage/EventSerachPage";

import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import AuthContext from "./store/auth-context2";
import EventNotification from "./pages/Events/EventNotification/EventNotification";
import AdminEventOverview from "./pages/Events/AdminEventOverview/AdminEventOverview";

function App() {
	const authCtx = useContext(AuthContext);
	console.log(" ide aplikcai");
	return (
		<>
			{/* {authCtx.isLoggedIn ? (
				<p>Is logged in, {authCtx.userid}</p>
			) : (
				<p>Is NOT logged in </p>
			)}
			{authCtx.isLoggedIn ? (
				<p>Is logged in, {authCtx.token}</p>
			) : (
				<p>No token </p>
			)} */}
			<Routes>
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Login />} />
				{true && <Route path="/home" element={<HomePage />} />}

				{authCtx.isLoggedIn ? (
					<Route path="/organize" exact element={<EventCreatePage />} />
				) : (
					<Route
						path="/organize"
						exact
						element={<Navigate replace to="/login" />}
					/>
				)}

				<Route path="/events/:id" exact element={<EventPage />} />
				<Route path="/search/" element={<EventSerachPage />} />
				{authCtx.isLoggedIn && (
					<Route path="/myevents" exact element={<EventOverviewPage />} />
				)}
				{authCtx.isLoggedIn && (
					<Route path="/admin" exact element={<AdminEventOverview />} />
				)}

				{authCtx.isLoggedIn && (
					<Route
						path="/myevents/:id/general"
						exact
						element={<EventEditGeneral />}
					/>
				)}
				{authCtx.isLoggedIn && (
					<Route
						path="/myevents/:id/poster"
						exact
						element={<EventEditPoster />}
					/>
				)}
				{authCtx.isLoggedIn && (
					<Route
						path="/myevents/:id/tickets"
						exact
						element={<EventEditTickets />}
					/>
				)}
				{authCtx.isLoggedIn && (
					<Route
						path="/myevents/:id/notify"
						exact
						element={<EventNotification />}
					/>
				)}

				<Route path="*" element={<Navigate replace to="/home" />} />
			</Routes>
		</>
	);
}

export default App;
