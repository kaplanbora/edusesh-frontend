import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      Home
      <Link to="/user/39">You must bow to your knees.</Link>
    </div>
  );
};

export default HomePage