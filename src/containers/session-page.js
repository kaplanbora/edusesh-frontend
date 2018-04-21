import React, {Component} from "react";
import {connect} from "react-redux";
import {endSession, loadMessages, loadSession, receiveMessage, sendMessage} from "../actions/sessions";
import {LiveSession} from "../components/live-session";
import {getTargetCredentials, getTargetProfile} from "../actions/load";

class SessionPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.props.load(this.props.token), 300);
    setTimeout(() => this.props.loadChat(this.props.token), 300);
  }

  render() {
    if (!this.props.session || !this.props.user || !this.props.token || !this.props.dispatch || !this.props.chat || !this.props.sendMessage || !this.props.receiveMessage || !this.props.finish) {
      return (
        <div className="loading loading-lg flex-centered full-height"/>
      );
    }

    if (!this.props.target.profile && this.props.user.role) {
      const targetId = this.props.user.role === "instructor" ?
        this.props.session.traineeId :
        this.props.session.instructorId;
      this.props.loadTargetProfile(targetId);
      this.props.loadTargetCredentials(targetId);
    }

    if (this.props.target.credentials == null || this.props.target.profile == null) {
      return (
        <div className="loading loading-lg flex-centered full-height"/>
      );
    }

    return (
      <LiveSession
        session={this.props.session}
        user={this.props.user}
        token={this.props.token}
        dispatch={this.props.dispatch}
        chat={this.props.chat}
        target={this.props.target}
        sendMessage={this.props.sendMessage}
        receiveMessage={this.props.receiveMessage}
        finish={this.props.finish}
      />
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
  target: state.targetUser,
  token: state.token,
  localStream: state.stream.local,
  remoteStream: state.stream.local,
  chat: state.chat,
  user: {
    id: state.user.credentials.id,
    role: state.user.credentials.userRole,
    name: `${state.user.profile.firstName} ${state.user.profile.lastName}`,
  }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: token => dispatch(loadSession(token, ownProps.match.params.id)),
  loadChat: token => dispatch(loadMessages(token, ownProps.match.params.id)),
  sendMessage: (token, message, sessionId, userId) => sendMessage(dispatch, token, message, sessionId, userId),
  receiveMessage: message => dispatch(receiveMessage(message)),
  loadTargetProfile: id => dispatch(getTargetProfile(id)),
  loadTargetCredentials: id => dispatch(getTargetCredentials(id)),
  finish: token => endSession(token, dispatch, ownProps.match.params.id),
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage)
