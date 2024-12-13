import React from "react";
import "../styles/ConfirmationDialog.css";

const ConfirmationDialog = ({ title, message, onClose, onConfirm }) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <div className="dialog-header">{title}</div>
                <div className="dialog-body">{message}</div>
                <div className="dialog-actions">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
