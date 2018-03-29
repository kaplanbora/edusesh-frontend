import React, {Component} from "react";
import {connect} from "react-redux";
import {getSelfSessions} from "../actions/load";
import {Link} from "react-router-dom";

class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadSessions();
  }

  getStatus(session) {
    if (session.isCompleted) return "Completed";
    else if (session.isApproved) return "Approved";
    else return "Not Approved";
  }

  formatDate(date) {
    const d = new Date(Date.parse(date));
    return d.toLocaleString();
  }

  render() {
    if (this.props.sessions.length === 0) {
      return (
        <div className="columns flex-centered full-height">
          <div className="empty">
            <div className="empty-icon">
              <i className="icon icon-time icon-4x"/>
            </div>
            <p className="empty-title h5">You have no sessions</p>
            <p className="empty-subtitle">Find instructors and start learning</p>
            <div className="empty-action">
              <button className="btn btn-primary">Find Instructors</button>
            </div>
          </div>
        </div>
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
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {this.props.sessions.map(session =>
              <tr key={session.id}>
                <td><Link className="btn btn-link" to={"/user/" + session.instructorId}>{session.instructorId}</Link>
                </td>
                <td>{session.topicId}</td>
                <td>{session.description}</td>
                <td>{this.formatDate(session.date)}</td>
                <td>{this.getStatus(session)}</td>
              </tr>
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
  loadSessions: () => dispatch(getSelfSessions(ownProps.token))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
