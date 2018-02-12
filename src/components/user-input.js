import React from "react";

const UserInput = (field) => {
  let statusClass = "";
  let hintClass = "hidden";
  if (field.status === "error") {
    statusClass = "is-error";
    hintClass = "";
  } else if (field.status === "success") {
    statusClass = "is-success";
    hintClass = "";
  }

  return (
    <div className="form-group">
      <label className="form-label">{field.label}</label>
      <input className={`form-input ${statusClass}`}
             type={field.label === "Password" ? "password" : "text"}
             placeholder={field.placeholder}
             {...field.input}
      />
      <p className={`form-input-hint ${hintClass}`}>{field.hint}</p>
    </div>
  );
};

export default UserInput