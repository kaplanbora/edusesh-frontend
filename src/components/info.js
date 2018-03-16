import React from "react";

const Info = ({message, status}) => {
    return (
      <div className={`my-2 toast toast-${status}`}>
        <button className="btn btn-clear float-right"/>
        {message}
      </div>
    )
};

export default Info