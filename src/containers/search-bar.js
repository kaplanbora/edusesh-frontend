import React from "react";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";
import {connect} from "react-redux";
import {search} from "../actions/search";

const Select = ({options, input}) => {
  return (
    <select className="form-select" {...input}>
      {options.map(option =>
        <option key={option.id} value={option.name}>{option.name}</option>
      )}
    </select>
  );
};

const Input = ({placeholder, input}) => {
  return (
    <input className="form-input" placeholder={placeholder} {...input}/>
  );
};

const categories = [
  {id: 0, name: "Topic"},
  {id: 1, name: "Instructor"}
];

const SearchBar = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group input-inline search-bar">
        <Field name="category" options={categories} component={Select}/>
        <Field name="query" placeholder="Find topics or instructors" component={Input}/>
        <button className="btn btn-success input-group-btn">Search</button>
      </div>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  onSubmit: values => search(dispatch, values)
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: "searchBar",
  initialValues: {
    category: "Topic"
  }
})(SearchBar));
