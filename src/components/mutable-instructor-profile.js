import React, {Component} from "react";
import {Field} from "redux-form";
import {reduxForm} from "redux-form";
import UserInput from "./user-input";
import Info from "./info";

const TextArea = ({input, label, placeholder}) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea className="form-input" placeholder={placeholder} rows="3" {...input}/>
    </div>
  );
};

class MutableInstructorProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="p-2">
        <h4>Profile</h4>
        <div className="divider"/>
        <div>
          <Field name="firstName" label="First Name" placeholder="Your first name" component={UserInput}/>
          <Field name="lastName" label="Last Name" placeholder="Your last name" component={UserInput}/>
          <Field name="occupation" label="Occupation" placeholder="Your occupation" component={UserInput}/>
          <Field name="hourlyRate" label="Hourly Rate" placeholder="Your rate per hour" component={UserInput}/>
          <Field name="description" label="Introduce Yourself" placeholder="Your information" component={TextArea}/>
        </div>
        <button
          className={`${this.props.submitting ? "loading" : ""} btn btn-primary float-right mt-3`}
          disabled={this.props.submitting}> Save
        </button>
        {this.props.submitSucceeded && <Info message="User profile saved successfully." status={"success"}/>}
      </form>
    );
  }
}

export default reduxForm({
  form: "instructorProfileForm",
})(MutableInstructorProfile);
