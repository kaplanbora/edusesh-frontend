import React from "react";
import ProfileSections from "./ProfileSections";
import {CHANGE_SECTION} from "../actions/types";
import {connect} from "react-redux";
import MutableProfile from "./mutable-profile";
import MutableCredentials from "./mutable-credentials";
import MutableSession from "./mutable-session";
import {saveCredentials} from "../actions/edit";

const MutableUser = ({section, changeSection, user, token}) => {

  let renderSection;
  switch (section) {
    case "credentials":
      renderSection =
        <MutableCredentials
          initialValues={{email: user.credentials.email}}
          credentials={user.credentials}
          onSubmit={saveCredentials}
          token={token}
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

const mapStateToProps = state => ({
  section: state.section,
  user: state.user,
  token: state.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSection: section => dispatch({
    type: CHANGE_SECTION,
    payload: section
  }),
  saveCredentials: credentials => saveCredentials(credentials, ownProps.token, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MutableUser)