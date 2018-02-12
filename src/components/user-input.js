import React from "react";

const UserInput = ({status, hint, label, placeholder}) => {
  let statusClass = "";
  let hintClass = "hidden";
  if (status === "error") {
    statusClass = "is-error";
    hintClass = "";
  } else if (status === "success") {
    statusClass = "is-success";
    hintClass = "";
  }

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className={`form-input ${statusClass}`} placeholder={placeholder}/>
      <p className={`form-input-hint ${hintClass}`}>{hint}</p>
    </div>
  );
};

export default UserInput