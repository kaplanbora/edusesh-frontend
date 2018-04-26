import React from "react";
import {InstructorCard} from "../components/instructor-card";

export const SearchPage = () => {
  return (
    <div className="columns">
      <div className="column col-4">
        <InstructorCard/>
        <InstructorCard/>
        <InstructorCard/>
        <InstructorCard/>
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch, ownProps) => {{
//   search: () => search(ownProps.match.params))
// }};

