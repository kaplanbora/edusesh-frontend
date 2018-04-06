import React from "react";

export const EmptyState = ({title, icon, message, buttonText}) => {
  return (
    <div className="columns flex-centered full-height">
      <div className="empty">
        <div className="empty-icon">
          <i className={`icon icon-4x ${icon}`}/>
        </div>
        <p className="empty-title h5">{title}</p>
        <p className="empty-subtitle">{message}</p>
        <div className="empty-action">
          {buttonText &&
            <button className="btn btn-primary">{buttonText}</button>
          }
        </div>
      </div>
    </div>
  );
};