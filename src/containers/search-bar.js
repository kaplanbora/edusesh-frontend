import React from "react";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";
import {connect} from "react-redux";
import {search} from "../actions/search";
import {withRouter} from "react-router";
import {Loading} from "../components/loading";

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

const SearchBar = ({handleSubmit, goSearch, history}) => {
  if (!history || !goSearch) {
    return <Loading/>;
  }

  return (
    <form onSubmit={handleSubmit(values => goSearch(values, history))}>
      <div className="input-group input-inline search-bar">
        <Field name="category" options={categories} component={Select}/>
        <Field name="query" placeholder="Find topics or instructors" component={Input}/>
        <button className="btn btn-success input-group-btn">Search</button>
      </div>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  goSearch: (values, history) => search(dispatch, values, history)
});

const SearchBarForm = reduxForm({
  form: "searchBar",
  initialValues: {
    category: "Topic"
  }
})(SearchBar);

export default withRouter(connect(null, mapDispatchToProps)(SearchBarForm));
