import React, {Component} from "react";
import {connect} from "react-redux";
import {loadSession} from "../actions/sessions";
import {LiveSession} from "../components/live-session";

class SessionPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.props.load(this.props.token), 200);
  }

  render() {
    const session = this.props.session;
    const user = this.props.user;
    const token = this.props.token;
    const dispatch = this.props.dispatch;

    return (
      <LiveSession session={session} user={user} token={token} dispatch={dispatch}/>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
  token: state.token,
  localStream: state.stream.local,
  remoteStream: state.stream.local,
  user: {
    id: state.user.credentials.id,
    role: state.user.credentials.userRole
  }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: token => dispatch(loadSession(token, ownProps.match.params.id)),
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage)
