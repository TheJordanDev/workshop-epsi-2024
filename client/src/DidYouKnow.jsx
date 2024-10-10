import { useEffect, useState } from "react";
import DidYouKnowSwitch from "./components/DidYouKnowSwitch";
import axios from "@/axios";
import "@/styles/DidYouKnow.scss";
import Loader from "./components/icons/Loader";

function DidYouKnow() {

    const [didYouKnow, setDidYouKnow] = useState([]);

    useEffect(() => {
        if (!didYouKnow.length)
            (async () => {
                const response = await axios.get("/dyk");
                setDidYouKnow(response.data.dyk);
            })();
    }, []);

    if (!didYouKnow.length) return <><Loader color="#AA86DA" duration={1}/></>;

    return <>
        <DidYouKnowSwitch on={true} setOn={()=>{}}/>
        <h1>Conseils pour vous et ceux qui vous entourent.</h1>
        <div className="dyk">
            {didYouKnow.map((dyk, index) => (
                <div className="dkyCard">
                    <div className="dykTitle">{dyk.type}</div>
                    <div className="dykLine">
                        <p key={index}>{dyk.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </>;

}

export default DidYouKnow;