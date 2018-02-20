import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import RegisterForm from "../components/register-form";
import {registerInstructor, registerTrainee} from "../actions/auth";

let RegisterPage = ({registerTrainee, registerInstructor, token, location}) => {
  const role = location.search.slice(6);
  if (token) {
    return <Redirect to="/"/>;
  } else if (role === "trainee") {
    return <RegisterForm onSubmit={registerTrainee}/>
  } else if (role === "instructor") {
    return <RegisterForm onSubmit={registerInstructor}/>
  } else {
    return <Redirect to="/"/>;
  }
};

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  registerTrainee: values => {
    dispatch(registerTrainee(values))
  },
  registerInstructor: values => {
    dispatch(registerInstructor(values))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

