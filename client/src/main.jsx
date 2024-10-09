import "@/styles/_reset.scss";
import "@/styles/index.scss";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import DidYouKnow from "./DidYouKnow.jsx";
import SessionLoader from "./SessionLoader.jsx";

function processInnerHeight() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/didyouknow",
		element: <DidYouKnow />,
	},
]);

addEventListener("resize", processInnerHeight);
processInnerHeight();
createRoot(document.getElementById("root")).render(
	<SessionLoader>
		<RouterProvider router={router} />
	</SessionLoader>
);
