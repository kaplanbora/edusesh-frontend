import React, {Component} from "react";
import {connect} from "react-redux";
import {loadSession} from "../actions/sessions";

class LiveSession extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    if (this.props.token) {
      this.props.loadSession(this.props.token)
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
  token: state.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadSession: token => loadSession(dispatch, token, ownProps.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveSession)
