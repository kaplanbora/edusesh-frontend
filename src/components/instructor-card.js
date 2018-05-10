import React from "react";
import {Link} from "react-router-dom";

export const InstructorCard = ({instructor}) => {
  return (
    <div className="card center-inside">
      <div className="card-image">
        <img src={`https://robohash.org/${instructor.userId}?set=set3`} className="img-responsive"/>
      </div>
      <div className="card-header">
        <div className="card-title h5">{instructor.name}</div>
        <div className="card-subtitle text-gray">{instructor.occupation}</div>
      </div>
      <div className="card-body">
        <div className="divider"/>
        <div>Total Sessions: {instructor.sessionCount}</div>
        <div>Rating: {Number.parseFloat(instructor.rating).toFixed(2)}</div>
        <div>Hourly Rate: {instructor.hourlyRate}$</div>
      </div>
      <div className="card-footer">
        <Link to={`/user/${instructor.userId}`} className="btn btn-success btn-block">Visit Profile</Link>
      </div>
    </div>
  );
};