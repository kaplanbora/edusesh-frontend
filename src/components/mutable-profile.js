import React from "react";
import ProfileSections from "./profile-sections";
import {CHANGE_SECTION} from "../actions/types";
import {connect} from "react-redux";

const MutableProfile = ({section, changeSection}) => {
  return (
    <div className="columns full-height">

      <ProfileSections section={section} onChange={changeSection}/>

      <div className="column col-10 profile-forms">
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

export default connect(mapStateToProps, mapDispatchToProps)(MutableProfile)