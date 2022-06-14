export const subscribeUser = () => {
	const applicationServerKey =
		"BP3mliomXHHuSTC3QOG4GEDxeFfAg__PBtHya2Hi5506OgQih8-Oc4DPgkaZDGP9aN73ak6Uydb1EtzAoJGYnYE";

	return navigator.serviceWorker.ready
		.then((serviceWorkerRegistration) => {
			return serviceWorkerRegistration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey,
			});
			// uncomment if more handling is needed

			// if (Notification.permission === "granted") {
			// 	// If it's okay, subscribe user
			// 	return serviceWorkerRegistration.pushManager.subscribe({
			// 		userVisibleOnly: true,
			// 		applicationServerKey,
			// 	});
			// }
			// // Otherwise, we need to ask the user for permission
			// else if (Notification.permission !== "denied") {

			// 	Notification.requestPermission().then((permission) => {
			// 		// If the user accepts, only then subscribe

			// 		if (permission === "granted") {
			// 			return serviceWorkerRegistration.pushManager.subscribe({
			// 				userVisibleOnly: true,
			// 				applicationServerKey,
			// 			});
			// 		}
			// 	});
			// }
		})
		.then((pushSubscription) => pushSubscription)
		.catch((err) => {
			console.log(err);
		});
};

export const unsubscribeUser = () => {
	return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
		return serviceWorkerRegistration.pushManager
			.getSubscription()
			.then((subscription) => subscription.unsubscribe());
	});
};
