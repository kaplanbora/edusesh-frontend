import React, {Component} from "react";
import {connect} from "react-redux";
import {getSelfSessions} from "../actions/load";
import {Link} from "react-router-dom";
import {REMOVE_SESSION} from "../actions/types";
import {approveSession, removeSession} from "../actions/sessions";
import {SessionRow} from "../components/session-row";
import {EmptyState} from "../components/empty-state";

class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadSessions();
  }


  render() {
    if (this.props.sessions.length === 0) {
      return (
        <EmptyState
          title="You have no sessions"
          message="Find instructors and start learning"
          icon="icon-title"
          buttonText="Find Instructors"
        />
      );
    }
    return (
      <div className="columns flex-centered">
        <div className="column col-10 p-3 white-bg m-3 shadowed">
          <h3>Sessions</h3>
          <div className="divider"/>
          <table className="table table-striped table-hover">
            <thead>
            <tr>
              <th>Instructor</th>
              <th>Topic</th>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.props.sessions
              .filter(session => !session.isDeleted)
              .map(session =>
                <SessionRow
                  key={session.id}
                  session={session}
                  approveSession={this.props.approveSession}
                  removeSession={this.props.removeSession}
                  role={this.props.role}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sessions: state.user.sessions,
  role: state.user.credentials.userRole
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadSessions: () => dispatch(getSelfSessions(ownProps.token)),
  removeSession: id => removeSession(dispatch, id, ownProps.token),
  approveSession: id => approveSession(dispatch, id, ownProps.token)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
