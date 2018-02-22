import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import MutableProfile from "../components/mutable-profile"

const UserProfile = ({token, location, user}) => {
  const id = location.search.slice(4);
  if (token && !id) {
    return <MutableProfile user={user}/>;
  } else if (id) {
    return <PublicProfile/>;
  } else {
    return <Redirect to="/"/>;
  }
};

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});

/*
const mapDispatchToProps = dispatch => ({
  loadCredentials: token => dispatch(getCredentials(token)),
  loadProfile: token => dispatch(getProfile(token))
});
*/

export default connect(mapStateToProps, null)(UserProfile)