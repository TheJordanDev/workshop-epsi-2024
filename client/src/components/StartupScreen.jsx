import { useEffect, useState } from "react";

const screens = [
    {
        title: "Bienvenue sur MindCheck",
        content: "L’appli de prévention et de sensibilisation aux troubles mentaux",
        subtitle: "",
        buttonText: "Suivant",
    },
    {
        title: "Explications",
        content: "Vous répondrez à un certain nombre de questions suivant si vous êtes plus ou moins en accord avec celles-ci",
        subtitle: "De “Pas d’accord” vers “D’accord” ",
        buttonText: "Suivant",
    },
    {
        title: "IMPORTANT",
        content: "Pas de diagnostic ici, juste une recommendation sous un format convivial et instructif",
        subtitle: "",
        buttonText: "Suivant",
    }
];

function StartupScreen({ finishedCallback }) {
    const [startupIndex, setStartupIndex] = useState(0);

    useEffect(() => {
        const savedIndex = parseInt(localStorage.getItem("startupIndex"), 10);
        if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < screens.length) {
            setStartupIndex(savedIndex);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("startupIndex", startupIndex);
        if (startupIndex >= screens.length) finishedCallback();
    }, [startupIndex]);

    const nextScreen = () => {
        setStartupIndex((prevIndex) => prevIndex + 1);
    };

    return (
        <div className="startup">
            <h1>{screens[startupIndex]?.title}</h1>
            <div className="info">
                <span>{screens[startupIndex]?.content}</span>
                <sub>{screens[startupIndex]?.subtitle}</sub>
            </div>
            <button onClick={nextScreen}>{screens[startupIndex]?.buttonText}</button>
        </div>
    );
}

export default StartupScreen;