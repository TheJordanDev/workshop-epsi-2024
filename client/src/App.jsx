import "@/styles/App.scss";
import Quizz from "./components/Quizz";
import { useEffect, useState } from "react";
import axios from "@/axios";
import Loader from "./components/Loader";

function App() {

	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const fetchSession = async () => {
			let id = localStorage.getItem("id");
			if (id) {
				axios.defaults.headers.common["Authorization"] = id;
			}
			const response = await axios.post("/make_session");
			const data = await response.data;
			id = data.id;
			localStorage.setItem("id", data.id);
			axios.defaults.headers.common["Authorization"] = id;
			setUserId(id);
		};
		setTimeout(() => {
			fetchSession()
				.catch((error) => {
					console.error("Error fetching session:", error);
				});
		}, 1000);
	}, []);

	return (
		<>
			{ userId && (
				<Quizz />
			) }
			{ !userId && (
				<div style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					width: "100%",
				}}>
					<Loader color="#c844ca" duration={1}/>
				</div>
			)}
		</>
	);
}

export default App;
