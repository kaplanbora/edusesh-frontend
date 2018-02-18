import React from "react";
import {CredentialsForm} from "./credentials-form";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";

const RememberCheck = ({input}) => {
  return (
    <label className="form-checkbox my-2">
      <input className="form-checkbox" {...input} type="checkbox"/>
      <i className="form-icon"/> Remember me
    </label>
  );
};

const LoginForm = ({handleSubmit, submitError, submitting}) => {
  return (
    <div className="container login-form">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="divider"/>
        <CredentialsForm/>
        {submitError && <p className="my-2 text-error">{submitError}</p>}
        <Field name="remember" component={RememberCheck}/>
        <button className={`${submitting ? "loading" : ""} btn btn-primary float-right my-2`}
                disabled={submitting}>Login
        </button>
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
