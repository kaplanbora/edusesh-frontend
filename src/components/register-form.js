import React from "react";
import {reduxForm} from "redux-form";
import {checkEmail} from "../actions/auth";
import {CredentialsForm} from "./credentials-form";

const RegisterForm = ({handleSubmit}) => {
  return (
      <div className="columns full-height flex-centered">
        <div className="column centered col-4 white-bg p-3 shadowed">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="divider"/>
            <p>Start learning from various professional instructors here at edusesh.</p>
            <CredentialsForm/>
            <button className="btn btn-primary form-submit float-right mt-3">Register</button>
          </form>
        </div>
      </div>
  )
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
  asyncBlurFields: ["email"],
  asyncValidate: checkEmail,
  form: "registerForm"
})(RegisterForm);

