import React from "react";

export const InstructorCard = () => {
  return (
    <div className="card">
      <div className="card-image">
        <img src="img/osx-el-capitan.jpg" className="img-responsive"/>
      </div>
      <div className="card-header">
        <div className="card-title h5">Microsoft</div>
        <div className="card-subtitle text-gray">Software and hardware</div>
      </div>
      <div className="card-body">
        Empower every person and every organization on the planet to achieve more.
      </div>
      <div className="card-footer">
        <button className="btn btn-primary">Do</button>
      </div>
    </div>
  );
};