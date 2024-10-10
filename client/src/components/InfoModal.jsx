import React from "react";
import "@/styles/modal.scss";

const InfoModel = ({ isOpen, onClose, info }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay"
            onClick={onClose}
        >
            <div className="modal-content">
                <div
                    style={{
                        width: "100%",
                        borderBottom: "1px solid black",
                    }}
                >                    
                    <h1
                        style={{
                            textTransform: "uppercase",
                        }}
                    >Conseil</h1>
                </div>
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>{info}</h2>
            </div>
        </div>
    );
};

export default InfoModel;