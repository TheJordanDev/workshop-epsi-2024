import { useEffect, useState } from "react";
import axios from "@/axios";
import Loader from "./components/icons/Loader";

const SessionLoader = ({ children }) => {
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
        }, 1);
    }, []);

    if (!userId) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
            }}>
                <Loader color="#AA86DA" duration={1}/>
            </div>
        );
    }

    return children;
};

export default SessionLoader;