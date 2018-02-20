import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser} from "../actions/auth";
import LoginForm from "../components/login-form"
import {clearError} from "../actions";

let LoginPage = ({login, token, submitError}) =>
  token ? <Redirect to="/"/> : <LoginForm onSubmit={login} submitError={submitError} clear={clearError}/>;

const mapStateToProps = state => ({
  token: state.token,
  submitError: state.errors.submit
});

const mapDispatchToProps = dispatch => ({
  login: values => loginUser(values, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

