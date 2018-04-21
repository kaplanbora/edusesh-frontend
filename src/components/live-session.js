import React, {Component} from "react";
import {EmptyState} from "../components/empty-state";
import {onUserReady} from "../actions/sessions";
import ChatPanel from "./chat-panel";
import {startConnection} from "../actions/signal";

const isFutureDate = date => Date.now() - Date.parse(date) < 0;

export class LiveSession extends Component {
  constructor(props) {
    super(props);
    this.localRef = React.createRef();
    this.remoteRef = React.createRef();
  }

  render () {
    const session = this.props.session;
    const user = this.props.user;
    const token = this.props.token;
    const dispatch = this.props.dispatch;
    const chat = this.props.chat;
    const onSend = this.props.sendMessage;
    const onReceive = this.props.receiveMessage;
    const target = this.props.target;

    console.log(target);


    let localStream = <video className="local-video m-2 shadowed" autoPlay={true} muted={true} ref={this.localRef}/>;
    let remoteStream = <video className="stream-video" autoPlay={true} controls={true} ref={this.remoteRef}/>;

    setTimeout(() => startConnection(session, user, token, dispatch, this.localRef, this.remoteRef, onReceive), 200);

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
        <div className="column col-9 stream flex-centered">
          {remoteStream}
        </div>
        <div className="column col-3">
          <div className="status center-inside">
            {localStream}
            <h4>{session.name}</h4>
            <h4>{session.startDate}</h4>
            <button className="btn btn-primary btn-block">End Session</button>
          </div>

          <ChatPanel chat={chat} onSubmit={(values) => onSend(token, values.message, session.id, user.id)} user={user} target={target} session={session}/>

        </div>
      </div>
    );
  };
}

