import React from "react";

const ProfileSections = ({changeSection, role}) => {
  return (
    <div className="column col-2 profile-sections py-2">
      <h4 className="mx-2">Account Settings</h4>
      <ul className="nav">
        <li className={`nav-item `}>
          <label className="btn btn-link section-item" onClick={() => changeSection("profile")}>Profile</label>
        </li>
        <li className="nav-item">
          <label className="btn btn-link section-item" onClick={() => changeSection("credentials")}>Credentials</label>
        </li>
        <li className="nav-item">
          <label className="btn btn-link section-item" onClick={() => changeSection("session")}>Live Sessions</label>
        </li>
        {role === "instructor" &&
        <li className="nav-item">
          <label className="btn btn-link section-item" onClick={() => changeSection("topics")}>Topics</label>
        </li>
        }
      </ul>
    </div>
  );
};

export default ProfileSections
