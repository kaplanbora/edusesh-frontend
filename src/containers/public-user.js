import React, {Component} from "react";
import {connect} from "react-redux";
import {getTargetCredentials, getTargetProfile, getTargetTopics} from "../actions/load";

class PublicUser extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadCredentials();
    this.props.loadProfile();
    this.props.loadTopics();
    console.log(this.props.targetUser);
  }

  render() {
    return (
      <div>
        Hello Publicer
      </div>
    );
  }
}

const mapStateToProps = state => ({
  targetUser: state.targetUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadCredentials: () => dispatch(getTargetCredentials(ownProps.match.params.id)),
  loadProfile: () => dispatch(getTargetProfile(ownProps.match.params.id)),
  loadTopics: () => dispatch(getTargetTopics(ownProps.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicUser)