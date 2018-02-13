import React from "react";
import {connect} from "react-redux";
import {registerRequest} from "../actions";
import UserInput from "../components/user-input"
import {Field, reduxForm} from "redux-form";
import {checkEmail} from "../actions/register";

let RegisterPage = ({register}) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      return register("");
    }}>
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
      <button className="btn btn-primary">Register</button>
    </form>
  );
};

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  register: credentials => {
    dispatch(registerRequest(credentials))
  }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => { // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.email)) {
      throw {email: 'That username is taken'};
    }
  });
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

RegisterPage = reduxForm({
  validate,
  asyncValidate: checkEmail,
  asyncBlurFields: ["email"],
  form: "registerForm"
})(RegisterPage);

RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default RegisterPage