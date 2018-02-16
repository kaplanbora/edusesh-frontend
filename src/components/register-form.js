import {Field} from "redux-form";
import React from "react";
import UserInput from "../components/user-input"
import {reduxForm} from "redux-form";
import {checkEmail} from "../actions/register";

const RegisterForm = ({handleSubmit, error}) => {
  return (
    <div className="container">
      <div className="columns">
        <div className="col-12 column">
          <form onSubmit={handleSubmit}>
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
            <button className="btn btn-primary">Register</button>
          </form>
        </div>
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
  asyncValidate: checkEmail,
  asyncBlurFields: ["email"],
  form: "registerForm"
})(RegisterForm);

