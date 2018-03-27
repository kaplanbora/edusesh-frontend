import React, {Component} from "react";
import {Field} from "redux-form";
import {reduxForm} from "redux-form";
import Info from "./info";
import HorizontalInput from "./horizontal-input";
import HorizontalSelect from "./horizontal-select";
import {REMOVE_USER_TOPIC} from "../actions/types";
import {deleteWithToken} from "../actions/topics";

class MutableInstructorTopics extends Component {
  constructor(props) {
    super(props)
  }

  removeUserToken(id, token) {
    this.props.dispatch({
      type: REMOVE_USER_TOPIC,
      payload: deleteWithToken(token, "/users/topics/" + id)
    })
  }

  componentDidMount() {
    this.props.loadMainTopics();
    this.props.loadUsersTopics();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="p-2">
        <h4>Topics</h4>
        <div className="divider"/>
        <p>Add some topics to your profile so people with the same interest can find you.</p>
        <div className="form-horizontal">
          <Field name="parentId" label="Category" options={this.props.topics} component={HorizontalSelect}/>
          <Field name="name" label="Topic" placeholder="Name of the topic" component={HorizontalInput}/>
        </div>
        <button
          className={`${this.props.submitting ? "loading" : ""} btn btn-primary float-right mt-2`}
          disabled={this.props.submitting}> Add
        </button>
        <h5 className="mt-3">Your Topics</h5>
        {this.props.userTopics.map(topic =>
          <span className="chip" key={topic.id}>
            {topic.name}
            <button className="btn btn-clear" aria-label="Close" role="button" onClick={() => this.removeUserToken(topic.id, this.props.token)}/>
          </span>
        )}
      </form>
    );
  }
}

export default reduxForm({
  form: "instructorTopicsForm",
})(MutableInstructorTopics);
