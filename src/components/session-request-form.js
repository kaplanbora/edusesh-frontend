import React from "react";
import {Field} from "redux-form";
import {reduxForm} from "redux-form";
import {TextArea} from "./mutable-instructor-profile";
import HorizontalSelect from "./horizontal-select";
import HorizontalInput from "./horizontal-input";

const SessionRequestForm = ({topics, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Session Request</h3>
      <div className="divider"/>
      <div className="form-horizontal">
        <Field name="topic" label="Topic" options={topics} component={HorizontalSelect}/>
        <Field name="date" label="Date" placeholder="3/28/2018, 9:14:13 PM" component={HorizontalInput}/>
      </div>
      <div className="divider"/>
      <Field
        name="description"
        label="Request Description"
        placeholder="Explain why are you sending a session request and what would you like to learn."
        component={TextArea}/>
      <button className="btn btn-primary float-right mt-3">Send</button>
    </form>
  )
};

export default reduxForm({
  form: "sessionRequestForm"
})(SessionRequestForm);
