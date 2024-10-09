import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useKonamiCode = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a"
    ];
    let konamiCodePosition = 0;

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === konamiCode[konamiCodePosition]) {
                konamiCodePosition++;
                if (konamiCodePosition === konamiCode.length) {
                    setIsModalOpen(true);
                    konamiCodePosition = 0;
                }
            } else {
                konamiCodePosition = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return { isModalOpen, closeModal }
};

export default useKonamiCode;