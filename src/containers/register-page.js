import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import UserInput from "../components/user-input"
import {Field, reduxForm} from "redux-form";
import {checkEmail, register} from "../actions/register";

let RegisterPage = ({handleSubmit, error, token}) => {
  if (token) {
    return <Redirect to="/"/>;
  }

  return (
    <div className="container register-page">
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
  );
};

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  onSubmit: credentials => {
    dispatch(register(credentials))
  }
});

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