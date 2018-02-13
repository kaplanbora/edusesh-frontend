import React from "react";

const UserInput = ({input, label, placeholder, meta: {asyncValidating, touched, error}}) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="has-icon-right user-input">
        <input className={`form-input ${touched && error ? "is-error" : ""}`}
               {...input}
               type={label === "Password" ? "password" : "text"}
               placeholder={placeholder}
        />
        {asyncValidating && <i className="form-icon loading"/>}
        {touched && error && <p className="form-input-hint">{error}</p>}
      </div>
    </div>
  );
};

export default UserInput