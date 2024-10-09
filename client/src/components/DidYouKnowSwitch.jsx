import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LightBulb from "./icons/LightBulb";

function DidYouKnowSwitch() {

    const navigate = useNavigate();
    const location = useLocation();
    const [on, setOn] = useState(location.pathname === "/didyouknow");

    useEffect(() => {
        setOn(location.pathname === "/didyouknow");
    }, [location.pathname]);

    const handleClick = () => {
        if (on) navigate("/");
        else navigate("/didyouknow");
    };

    return (
        <div
            onClick={handleClick}
            style={{ position: "absolute", top: "1rem", right: "1rem", width: "2rem", height: "2rem" }}
        >
            <LightBulb on={on} />
        </div>
    );
}

export default DidYouKnowSwitch;