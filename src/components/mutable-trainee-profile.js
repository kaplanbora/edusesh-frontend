import React from "react";
import {Field} from "redux-form";
import {reduxForm} from "redux-form";
import UserInput from "./user-input";
import Info from "./info";

const MutableTraineeProfile = ({handleSubmit, submitSucceeded, submitting}) => {
  return (
    <form onSubmit={handleSubmit} className="p-2">
      <h4>Profile</h4>
      <div className="divider"/>
      <div>
        <Field name="firstName" label="First Name" placeholder="Your first name" component={UserInput}/>
        <Field name="lastName" label="Last Name" placeholder="Your last name" component={UserInput}/>
      </div>
      {submitSucceeded && <Info message="User profile saved successfully." status={"success"}/>}
      <button
        className={`${submitting ? "loading" : ""} btn btn-primary float-right mt-3`}
        disabled={submitting}> Save
      </button>
    </form>
  );
};

export default reduxForm({
  form: "traineeProfileForm",
})(MutableTraineeProfile);
