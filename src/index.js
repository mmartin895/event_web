import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context2";
import { register } from "./service-worker-registration";
// if ("serviceWorker" in navigator) {
// 	console.log("service worker je u nagivatoru");
// 	navigator.serviceWorker.ready
// 		.then(function (registration) {
// 			registration.showNotification("Vibration Sample", {
// 				body: "Buzz! Buzz!",
// 				vibrate: [200, 100, 200, 100, 200, 100, 200],
// 				tag: "vibration-sample",
// 			});
// 		})
// 		.catch((err) => console.log(err));
// }

register();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthContextProvider>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
