import React from "react";
import {CredentialsForm} from "../components/credentials-form"
import {reduxForm} from "redux-form";
import {checkEmail} from "../actions/auth";
import Info from "./info";

const MutableCredentials = ({handleSubmit, submitting, submitSucceeded}) => {
  return (
    <form onSubmit={handleSubmit} className="p-2">
      <h4>Credentials</h4>
      <div className="divider"/>
      <CredentialsForm/>
      {submitSucceeded && <Info message="User credentials saved successfully." status={"success"}/>}
      <button
        className={`${submitting ? "loading" : ""} btn btn-primary float-right mt-3`}
        disabled={submitting}> Save
      </button>
    </form>
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
  asyncValidate: checkEmail,
  asyncBlurFields: ["email"],
  form: "credentialsForm",
})(MutableCredentials);
