if ("serviceWorker" in navigator) {
	navigator.serviceWorker.ready
		.then((registration) => {
			registration.unregister();
		})
		.catch((error) => console.log("ServiceWorker Warning: ", error));
}
