import React from "react";
import "@/styles/modal.scss";
import rick from "@/assets/rick.mp4";

const RickRollModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <video width="100%" controls autoPlay>
                    <source src={rick} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default RickRollModal;