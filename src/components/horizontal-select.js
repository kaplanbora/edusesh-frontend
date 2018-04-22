import React from "react";

const HorizontalSelect = ({options, input, label, meta: {asyncValidating}}) => {
  return (
    <div className="form-group">
      <div className="col-2">
        <label className="form-label">{label}</label>
      </div>
      <div className="col-10">
        <select className="form-select" {...input}>
          {options.map(option =>
            <option key={option.id} value={option.id}>{option.name}</option>
          )}
        </select>
        {asyncValidating && <i className="form-icon loading"/>}
      </div>
    </div>
  );
};

export default HorizontalSelect
