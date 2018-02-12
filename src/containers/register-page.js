import React from "react";
import {connect} from "react-redux";
import {registerRequest} from "../actions";
import UserInput from "../components/user-input"

const RegisterPage = ({email, password, register}) => {
  let emailInput;
  let passwordInput;
  return (
    <form onSubmit={() => register({
      email: emailInput.value,
      password: passwordInput.value
    })}>
      <UserInput
        label={"Email"}
        placeholder={"Your email address"}
        status={email.status}
        hint={email.message}
      />
      <UserInput
        label={"Password"}
        placeholder={"Your password"}
        status={password.status}
        hint={password.message}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)