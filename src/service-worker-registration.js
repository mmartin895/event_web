const heroku = "https://event-upp.herokuapp.com/";
const localhost = "http://localhost:3007/";
export function register() {
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", () => {
			navigator.serviceWorker.register(heroku + "service-worker.js");
		});
	}
}
