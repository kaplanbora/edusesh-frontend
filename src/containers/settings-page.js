import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import MutableUser from "../components/mutable-user"

const SettingsPage = ({match, token, location}) => {
  const id = location.search.slice(4);
  if (token && !id) {
    return <MutableUser/>
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

export default connect(mapStateToProps, null)(SettingsPage)