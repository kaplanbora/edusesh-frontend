import React, {Component} from "react";
import {connect} from "react-redux";
import {loadSession} from "../actions/sessions";
import {EmptyState} from "../components/empty-state";
import {SET_USER_READY} from "../actions/types";

// const socket = new WebSocket("ws://192.168.1.42:6503", "json");
var connection = null;

const isFutureDate = date => Date.now() - Date.parse(date) < 0;

const onUserReady = (dispatch, user) => {
  // socket.send(JSON.stringify({
  //   type: "user_ready",
  //   userId: user.credentials.id
  // }));
  dispatch({type: SET_USER_READY})
};


class LiveSession extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token && !nextProps.session) {
      this.props.load(nextProps.token)
    }
  }

  render() {
    const sesh = this.props.session;
    if (!sesh) {
      return (
        <div className="loading loading-lg flex-centered full-height"/>
      );
    } else if (isFutureDate(sesh.date)) {
      return (
        <EmptyState
          title="Your session has not started yet"
          message={`Session Date: ${sesh.date}`}
          icon="icon-time"
        />
      )
    } else if (!sesh.isApproved) {
      return (
        <EmptyState
          title="Your session request has been denied"
          message={`${sesh.instructorId} has rejected your request for a session.`}
          icon="icon-cross"
        />
      )
    } else if (!sesh.isStarted) {
      return (
        <div className="columns flex-centered full-height">
          <div>
            <h2 className="py-2">Are you ready to start?</h2>
            <button className="btn btn-primary btn-lg centered" onClick={() => this.props.onReady(this.props.user)}>Start Session</button>
            <div className="py-2 flex-centered">
              <div className="p-3 center-inside">
                <h4>You</h4>
                <i className={`icon icon-2x ${sesh.userReady ? "icon-check" : "icon-cross"}`}/>
              </div>
              <div className="p-3 center-inside">
                <h4>Them</h4>
                <i className={`icon icon-2x ${sesh.targetReady ? "icon-check" : "icon-cross"}`}/>
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
  }
}

const mapStateToProps = state => ({
  session: state.session,
  token: state.token,
  user: state.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: token => loadSession(dispatch, token, ownProps.match.params.id),
  onReady: user => onUserReady(dispatch, user)
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveSession)
