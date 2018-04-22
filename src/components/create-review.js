import React from "react";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";
import HorizontalInput from "./horizontal-input";
import HorizontalSelect from "./horizontal-select";
import {TextArea} from "./mutable-instructor-profile";

const ratings = [
  {id: 1, name: 1},
  {id: 2, name: 2},
  {id: 3, name: 3},
  {id: 4, name: 4},
  {id: 5, name: 5},
];

const CreateReview = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Review</h3>
      <div className="divider"/>
      <div className="form-horizontal">
        <Field name="title" label="Title" placeholder="Summary of the review" component={HorizontalInput}/>
        <Field name="rating" label="Rating" options={ratings} component={HorizontalSelect}/>
      </div>
      <div className="divider"/>
      <Field
        name="comment"
        label="Comment"
        placeholder="Detailed description of your review"
        component={TextArea}/>
      <button className="btn btn-primary float-right mt-3">Save</button>
    </form>
  )
};

export default reduxForm({
  form: "createReview",
})(CreateReview);

