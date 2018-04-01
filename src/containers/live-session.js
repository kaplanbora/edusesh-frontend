import React, {Component} from "react";
import {connect} from "react-redux";
import {loadSession} from "../actions/sessions";

class LiveSession extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.load(nextProps.token)
    }
  }

  render() {
    if (!this.props.session) {
      return (
        <div className="loading loading-lg flex-centered full-height"/>
      );
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
                  <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
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
                  <p className="tile-subtitle">The Strategic Homeland Intervention, Enforcement, and Logistics Division...</p>
                </div>
              </div>
              <div className="tile">
                <div className="tile-icon">
                  <figure className="avatar" data-initial="TS"/>
                </div>
                <div className="tile-content">
                  <p className="tile-title">Tony Stark</p>
                  <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
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
                  <p className="tile-subtitle">The Strategic Homeland Intervention, Enforcement, and Logistics Division...</p>
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
                  <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
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
  token: state.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: token => loadSession(dispatch, token, ownProps.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveSession)
