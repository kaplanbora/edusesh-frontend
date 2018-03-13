import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import MutableUser from "./mutable-user"

const UserProfile = ({token, location, user, section}) => {
  const id = location.search.slice(4);
  if (token && !id) {
    return <MutableUser token={token} user={user} section={section}/>;
  } else if (id) {
    return <PublicProfile/>;
  } else {
    return <Redirect to="/"/>;
  }
};

const mapStateToProps = state => ({
  token: state.token,
  user: state.user,
  section: state.section
});

/*
const mapDispatchToProps = dispatch => ({
  loadCredentials: token => dispatch(getCredentials(token)),
  loadProfile: token => dispatch(getProfile(token))
});
*/

export default connect(mapStateToProps, null)(UserProfile)