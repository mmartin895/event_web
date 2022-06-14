export function register() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register("http://localhost:3006/service-worker.js");
		});
	}
}