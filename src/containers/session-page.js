import React, {Component} from "react";
import {connect} from "react-redux";
import {loadMessages, loadSession, receiveMessage, sendMessage} from "../actions/sessions";
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
    if (!this.props.session || !this.props.user || !this.props.token || !this.props.dispatch || !this.props.chat || !this.props.sendMessage || !this.props.receiveMessage) {
      return (
        <div className="loading loading-lg flex-centered full-height"/>
      );
    }

    if(!this.props.target.profile) {
      const targetId = this.props.user.role === "instructor" ?
        this.props.session.instructorId :
        this.props.session.traineeId;
      this.props.loadTargetProfile(targetId);
      this.props.loadTargetCredentials(targetId);
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
    avatar: state.user.profile.imageLink
  }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: token => dispatch(loadSession(token, ownProps.match.params.id)),
  loadChat: token => dispatch(loadMessages(token, ownProps.match.params.id)),
  sendMessage: (token, message) => sendMessage(dispatch, ownProps.token, message),
  receiveMessage: message => dispatch(receiveMessage(message)),
  loadTargetProfile: id => dispatch(getTargetProfile(id)),
  loadTargetCredentials: id => dispatch(getTargetCredentials(id)),
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage)
