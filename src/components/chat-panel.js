import React from "react";

export const ChatPanel = () => {
  return (
    <div className="panel chat">
      <div className="panel-header">
        <div className="panel-title h6">Chat</div>
      </div>
      <div className="panel-body">
        <div className="tile">
          <div className="tile-icon">
            <figure className="avatar">
              <img src="img/avatar-1.png" alt="Avatar"/>
            </figure>
          </div>
          <div className="tile-content">
            <p className="tile-title">Thor Odinson</p>
            <p
              className="tile-subtitle">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <figure className="avatar">
              <img src="img/avatar-2.png" alt="Avatar"/>
            </figure>
          </div>
          <div className="tile-content">
            <p className="tile-title">Bruce Banner</p>
            <p
              className="tile-subtitle">The Strategic Homeland Intervention, Enforcement, and Logistics Division...</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <figure className="avatar" data-initial="TS"/>
          </div>
          <div className="tile-content">
            <p className="tile-title">Tony Stark</p>
            <p
              className="tile-subtitle">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <figure className="avatar">
              <img src="img/avatar-4.png" alt="Avatar"/>
            </figure>
          </div>
          <div className="tile-content">
            <p className="tile-title">Steve Rogers</p>
            <p
              className="tile-subtitle">The Strategic Homeland Intervention, Enforcement, and Logistics Division...</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <figure className="avatar">
              <img src="img/avatar-3.png" alt="Avatar"/>
            </figure>
          </div>
          <div className="tile-content">
            <p className="tile-title">Natasha Romanoff</p>
            <p
              className="tile-subtitle">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <div className="input-group">
          <input className="form-input" placeholder="Hello" type="text"/>
          <button className="btn btn-primary input-group-btn">Send</button>
        </div>
      </div>
    </div>
  );
};