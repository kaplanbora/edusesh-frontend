import {Field} from "redux-form";
import React from "react";
import UserInput from "../components/user-input"
import {reduxForm} from "redux-form";
import {checkEmail} from "../actions/register";

const RegisterForm = ({handleSubmit, error}) => {
  return (
    <div className="container register-form">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="divider"/>
        <p>Start learning from various professional instructors here at edusesh.</p>
        <Field
          label="Email"
          name="email"
          placeholder="Your email address"
          component={UserInput}
        />
        <Field
          label="Password"
          name="password"
          placeholder="Your password"
          component={UserInput}
        />
        {error && <span>{error}</span>}
        <button className="btn btn-primary form-submit">Register</button>
      </form>
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
  asyncValidate: checkEmail,
  asyncBlurFields: ["email"],
  form: "registerForm"
})(RegisterForm);

