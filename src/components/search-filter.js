import React from "react";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";

const FilterForm = ({input, filter, label}) => (
  <div className="form-group">
    <div className="col-12">
      <h5 className="form-label">{label}</h5>
    </div>
    <div className="col-6">
      <span>{filter}</span>
    </div>
    <div className="col-1"/>
    <div className="col-5">
      <input className="form-input" {...input}/>
    </div>
  </div>
);

const SearchFilter = ({handleSubmit}) => {
  return (
    <form className="form-horizontal m-2" onSubmit={handleSubmit}>
      <Field name="hourlyRate" label="Hourly Rate" filter="Maximum" component={FilterForm}/>
      <Field name="sessionCount" label="Session Count" filter="Minimum" component={FilterForm}/>
      <Field name="rating" label="User Rating" filter="Minimum" component={FilterForm}/>
      <button className="btn btn-primary btn-block mt-3">Filter</button>
    </form>
  );
};

export default reduxForm({
  form: "searchFilter"
})(SearchFilter);
