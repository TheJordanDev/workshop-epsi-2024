import React from "react";
import "@/styles/modal.scss";

const InfoModel = ({ isOpen, onClose, info }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                <div className="modal-header">                    
                    <h1>Conseil</h1>
                </div>
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>{info}</h2>
            </div>
        </div>
    );
};

export default InfoModel;