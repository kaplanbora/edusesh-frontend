import React from "react";
import ProfileSections from "./ProfileSections";
import {CHANGE_SECTION} from "../actions/types";
import {connect} from "react-redux";
import MutableProfile from "./mutable-profile";
import MutableCredentials from "./mutable-credentials";
import MutableSession from "./mutable-session";

const MutableUser = ({section, changeSection}) => {
  let renderSection;
  switch (section) {
    case "credentials":
      renderSection = <MutableCredentials/>;
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
      <div className="column col-10 profile-forms">
        {renderSection}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  section: state.section
});

const mapDispatchToProps = dispatch => ({
  changeSection: section => dispatch({
    type: CHANGE_SECTION,
    payload: section
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(MutableUser)