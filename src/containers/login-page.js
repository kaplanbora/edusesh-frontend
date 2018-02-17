import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser} from "../actions/register";
import LoginForm from "../components/login-form"

let LoginPage = ({login, token}) =>
  token ? <Redirect to="/"/> : <LoginForm onSubmit={login}/>;

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  login: values => dispatch(loginUser(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

