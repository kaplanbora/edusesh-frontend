import React from "react";

const HorizontalInput = ({type, input, label, placeholder, meta: {asyncValidating, touched, error}}) => {
  return (
    <div className="form-group">
      <div className="col-2">
        <label className="form-label">{label}</label>
      </div>
      <div className="col-10">
        <input className={`form-input ${touched && error ? "is-error" : ""}`}
               {...input}
               type={type}
               placeholder={placeholder}
        />
        {asyncValidating && <i className="form-icon loading"/>}
        {touched && error && <p className="form-input-hint">{error}</p>}
      </div>
    </div>
  );
};

export default HorizontalInput
