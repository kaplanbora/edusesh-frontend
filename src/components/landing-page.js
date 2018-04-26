import React from "react";
import {Link} from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="columns full-height">
      <div className="col col-12 hero">
        <h1>Learn anything</h1>
        <h3>Find professionals for any skill you want and start learning</h3>
        <div className="register">
          <Link to="/register?role=trainee" className="btn btn-success btn-lg">Start Learning</Link>
        </div>
      </div>
    </div>
  );
};