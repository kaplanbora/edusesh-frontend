import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser} from "../actions/auth";
import LoginForm from "../components/login-form"
import {clearError} from "../actions";
import {MODAL_CLOSE_LOGIN, MODAL_OPEN_LOGIN} from "../actions/types";

let LoginPage = ({login, token, submitError, modal, openModal, closeModal}) =>
  token
    ? <Redirect to="/"/>
    : <LoginForm
      onSubmit={login}
      submitError={submitError}
      clear={clearError}
      openModal={openModal}
      closeModal={closeModal}
      modal={modal}
    />;

const mapStateToProps = state => ({
  token: state.token,
  submitError: state.errors.submit,
  modal: state.modals.login
});

const mapDispatchToProps = dispatch => ({
  login: values => loginUser(values, dispatch),
  openModal: () => dispatch({type: MODAL_OPEN_LOGIN}),
  closeModal: () => dispatch({type: MODAL_CLOSE_LOGIN})
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

