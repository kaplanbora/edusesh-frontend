import React from "react";

const Modal = ({modal, closeModal, children, footer}) => {
  return (
    <div>
      <div className={`modal ${modal ? "active" : ""}`} id="modal-id">
        <a href="#" onClick={closeModal} className="modal-overlay" aria-label="Close"/>

        <div className="modal-container">
          <div className="modal-header">
            <a href="#" onClick={closeModal} className="btn btn-clear float-right" aria-label="Close"/>
          </div>

          <div className="modal-body">
            <div className="content">
              {children}
            </div>
          </div>

          <div className="modal-footer">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
