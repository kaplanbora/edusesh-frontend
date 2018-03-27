import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import MutableUser from "./mutable-user"

const UserProfile = ({topics, token, location, user, section}) => {
  const id = location.search.slice(4);
  if (token && !id) {
    return <MutableUser token={token} topics={topics} user={user} section={section}/>;
  } else if (id) {
    return <PublicProfile/>;
  } else {
    return <Redirect to="/"/>;
  }
};

const mapStateToProps = state => ({
  token: state.token,
  user: state.user,
  section: state.section,
  topics: state.topics
});

export default connect(mapStateToProps, null)(UserProfile)