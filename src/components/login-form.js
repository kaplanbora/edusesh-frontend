import React from "react";
import {CredentialsForm} from "./credentials-form";
import {reduxForm} from "redux-form";

const LoginForm = ({handleSubmit, error}) => {
  return (
    <div className="container register-form">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="divider"/>
        <CredentialsForm/>
        {error && <p className="form-input-hint">error</p>}
        <label className="form-checkbox">
          <input type="checkbox"/>
          <i className="form-icon"/> Remember me
        </label>
        <button className="btn btn-primary form-submit">Login</button>
      </form>
    </div>
  );
};

const validate = inputs => {
  const errors = {};
  if (!inputs.email) {
    errors.email = "Please enter a valid email address."
  }
  if (!inputs.password || inputs.password.length < 8) {
    errors.password = "Password cannot be shorter than 8 characters."
  }
  return errors;
};

export default reduxForm({
  validate,
  form: "loginForm"
})(LoginForm);
