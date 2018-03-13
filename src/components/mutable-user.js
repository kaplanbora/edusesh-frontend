import React from "react";
import ProfileSections from "./profile-sections";
import {CHANGE_SECTION} from "../actions/types";
import {connect} from "react-redux";
import MutableProfile from "./mutable-profile";
import MutableCredentials from "./mutable-credentials";
import MutableSession from "./mutable-session";
import {saveCredentials} from "../actions/edit";

const MutableUser = ({section, changeSection, user, submitCred}) => {
  let renderSection;
  switch (section) {
    case "credentials":
      renderSection =
        <MutableCredentials
          initialValues={{email: user.credentials.email}}
          onSubmit={submitCred}
        />;
      break;
    case "session":
      renderSection = <MutableSession/>;
      break;
    default:
      renderSection = <MutableProfile/>;
  }

  return (
    <div className="columns full-height">
      <ProfileSections changeSection={changeSection}/>
      <div className="column col-4 col-mr-auto profile-forms p-2">
        {renderSection}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSection: section => dispatch({
    type: CHANGE_SECTION,
    payload: section
  }),
  submitCred: credentials => saveCredentials(credentials, ownProps, dispatch)
});

export default connect(null, mapDispatchToProps)(MutableUser)