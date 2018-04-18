import React from "react";

export const ChatMessage = (avatar, name, message) => {
  return (
    <div className="tile">
      <div className="tile-icon">
        <figure className="avatar">
          <img src={avatar} alt="Avatar"/>
        </figure>
      </div>
      <div className="tile-content">
        <p className="tile-title">{name}</p>
        <p className="tile-subtitle">{message}</p>
      </div>
    </div>
  );
};