import React from "react";
import {EmptyState} from "../components/empty-state";
import {SET_TARGET_READY, SET_USER_READY, START_SESSION} from "../actions/types";
import {initiateConnection, onTargetReady, onUserReady, sessionReady} from "../actions/sessions";

let socket = null;

export const sendToServer = message => {
  let msgJSON = JSON.stringify(message);
  console.log("Sending message:");
  console.log(message);
  socket.send(msgJSON);
};

const isFutureDate = date => Date.now() - Date.parse(date) < 0;

const startConnection = (session, user, token, dispatch) => {
  if (socket) {
    return;
  }

  console.log("-------Starting socket");
  socket = new WebSocket("ws://192.168.1.42:6503", "json");
  console.log(user);
  setTimeout(() => initiateConnection(user, session), 200);

  socket.onmessage = event => {
    let message = JSON.parse(event.data);
    console.log("Received Message: ");
    console.log(event);
    let time = new Date(message.date);
    let timeStr = time.toLocaleTimeString();

    switch (message.type) {
      case "target_is_ready":
        onTargetReady(dispatch);
        break;
      case "start_session":
        sessionReady(dispatch, user, session, message.payload, token);
        break;
    }
  }
};

export const LiveSession = ({session, user, token, dispatch}) => {
  if (!session || !user || !token || !dispatch) {
    return (
      <div className="loading loading-lg flex-centered full-height"/>
    );
  }

  setTimeout(() => startConnection(session, user, token, dispatch), 200);

  if (isFutureDate(session.date)) {
    return (
      <EmptyState
        title="Your session has not started yet"
        message={`Session Date: ${session.date}`}
        icon="icon-time"
      />
    )
  } else if (!session.isApproved) {
    return (
      <EmptyState
        title="Your session request is not approved"
        message={`${session.instructorId} has not approved your request yet`}
        icon="icon-cross"
      />
    )
  } else if (!session.isStarted) {
    return (
      <div className="columns flex-centered full-height">
        <div>
          <h2 className="py-2">Are you ready to start?</h2>
          <button className="btn btn-primary btn-lg centered"
                  onClick={() => onUserReady(dispatch, user)}>Start Session
          </button>
          <div className="py-2 flex-centered">
            <div className="p-3 center-inside">
              <h4>You</h4>
              <i className={`icon icon-2x ${session.userReady ? "icon-check" : "icon-cross"}`}/>
            </div>
            <div className="p-3 center-inside">
              <h4>Them</h4>
              <i className={`icon icon-2x ${session.targetReady ? "icon-check" : "icon-cross"}`}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="columns col-gapless full-height">
      <div className="column col-9 stream">
        <video className="stream-video"/>
      </div>
      <div className="column col-3">
        <div className="status center-inside">
          <h4>{this.props.session.name}</h4>
          <h4>00:13:37</h4>
          <button className="btn btn-primary btn-block">End Session</button>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title h6">Comments</div>
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

      </div>
    </div>
  );
};
