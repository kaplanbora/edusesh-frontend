import React from "react";

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
      <div className="divider"/>
      <div className="card-body">
        <p>Total Sessions: {instructor.sessionCount}</p>
        <p>Rating: {instructor.rating}</p>
        <p>Hourly Rate: {instructor.hourlyRate}$</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary btn-block">Visit Profile</button>
      </div>
    </div>
  );
};