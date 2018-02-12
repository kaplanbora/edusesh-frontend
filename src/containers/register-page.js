import React from "react";
import {connect} from "react-redux";
import {registerRequest} from "../actions";
import UserInput from "../components/user-input"
import {Field, reduxForm} from "redux-form";

let RegisterPage = ({email, password, register}) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      return register("");
    }}>
      <Field
        label="Email"
        name="email"
        placeholder="Your email address"
        status={email.status}
        hint={email.message}
        component={UserInput}
      />
      <Field
        label="Password"
        name="password"
        placeholder="Your password"
        status={password.status}
        hint={password.message}
        component={UserInput}
      />
      <button className="btn btn-primary">Register</button>
    </form>
  );
};

const mapStateToProps = state => ({
  email: state.registerPage.email,
  password: state.registerPage.password,
});

const mapDispatchToProps = dispatch => ({
  register: credentials => {
    dispatch(registerRequest(credentials))
  }
});

RegisterPage = reduxForm({
  form: "registerForm"
})(RegisterPage);

RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default RegisterPage