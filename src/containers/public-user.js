import React, {Component} from "react";
import {connect} from "react-redux";
import {getTargetCredentials, getTargetProfile, getTargetTopics} from "../actions/load";
import Topic from "../components/topic";
import SessionRequest from "./session-request";

class PublicUser extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadCredentials();
    this.props.loadProfile();
    this.props.loadTopics();
  }

  render() {
    if (this.props.targetUser.profile === null) {
      return (<div className="full-height loading loading-lg"/>)
    }
    const profile = this.props.targetUser.profile;
    const credentials = this.props.targetUser.credentials;
    const topics = this.props.targetUser.topics;
    const image = profile.imageLink ? profile.imageLink : `https://robohash.org/${credentials.id}?set=set3`;
    const initials = profile.firstName && profile.lastName ?
      `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}` :
      `${credentials.email.substring(0, 2).toUpperCase()}`;
    return (
      <div className="columns">
        <div className="column col-3 mt-3">
          <div className="column col-9 centered white-bg shadowed p-3">
            <SessionRequest topics={topics} token={this.props.token} id={this.props.match.params.id}/>
            <span className="label d-block p-2 text-center">Hourly Rate: {profile.hourlyRate}$</span>
          </div>
        </div>
        <div className="column col-6 p-5 centered white-bg m-3 shadowed">
          <img className="centered" width="300" height="300" alt={initials} src={image}/>
          <h2 className="text-center">{`${profile.firstName} ${profile.lastName}`}</h2>
          <h4 className="text-center">{profile.occupation}</h4>
          <h5 className="mt-4">Personal Information</h5>
          <div className="divider"/>
          <p className="mt-2 text-justify">{profile.description}</p>
          <h5 className="mt-4">Professional Skills</h5>
          <div className="divider"/>
          {topics.map(topic =>
            <Topic key={topic.id} topic={topic}/>
          )}
        </div>
        <div className="column col-3"/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  targetUser: state.targetUser,
  token: state.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadCredentials: () => dispatch(getTargetCredentials(ownProps.match.params.id)),
  loadProfile: () => dispatch(getTargetProfile(ownProps.match.params.id)),
  loadTopics: () => dispatch(getTargetTopics(ownProps.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicUser)