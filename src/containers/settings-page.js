import React from "react";

const SettingsPage = () => {
  return (
    <div className="modal active" id="modal-id">
      <a href="#close" className="modal-overlay" aria-label="Close"/>

      <div className="modal-container active">
        <div className="modal-header">
          <a href="#close" className="btn btn-clear float-right" aria-label="Close"/>
          <div className="modal-title h5">Login</div>
        </div>

        <div className="modal-body">
          <div className="content">
            Titanfall
          </div>
        </div>

        <div className="modal-footer">
          ...
        </div>

      </div>
    </div>
  );
};

export default SettingsPage