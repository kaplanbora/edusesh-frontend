import React from "react";
import {Link} from "react-router-dom";

const ProfileSections = ({section}) => {
  return (
    <div className="column col-2 profile-sections centered py-2">
      <h4 className="mx-2">Account Settings</h4>
      <ul className="nav">
        <li className={`nav-item ${section === "profile" ? "active" : ""}`}>
          <Link to="/user/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/user/credentials" className={section === "credentials" ? "active" : ""}>Credentials</Link>
        </li>
        <li className="nav-item">
          <Link to="/user/session" className={section === "session" ? "active" : ""}>Live Sessions</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSections
