import React from "react";
import ProfileSections from "../components/profile-sections";
import {CHANGE_SECTION} from "../actions/types";
import {connect} from "react-redux";
import MutableTraineeProfile from "../components/mutable-trainee-profile";
import MutableCredentials from "../components/mutable-credentials";
import MutableSession from "../components/mutable-session";
import {saveCredentials, saveInstructorProfile, saveTraineeProfile} from "../actions/edit";
import MutableInstructorProfile from "../components/mutable-instructor-profile";

const MutableUser = ({section, changeSection, user, submitCred, submitTrainee, submitInstructor}) => {
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
      renderSection = user.credentials.userRole === "trainee" ?
        <MutableTraineeProfile
          onSubmit={submitTrainee}
          initialValues={{
            firstName: user.profile.firstName,
            lastName: user.profile.lastName
          }}/> :
        <MutableInstructorProfile
          onSubmit={submitInstructor}
          initialValues={{
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            occupation: user.profile.occupation,
            description: user.profile.description,
            hourlyRate: user.profile.hourlyRate,
          }}
        />;
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
  submitCred: credentials => saveCredentials(credentials, ownProps.token, dispatch),
  submitTrainee: values => saveTraineeProfile(values, ownProps.token, dispatch),
  submitInstructor: values => saveInstructorProfile(values, ownProps.token, dispatch)
});

export default connect(null, mapDispatchToProps)(MutableUser)