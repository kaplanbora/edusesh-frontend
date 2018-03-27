import React from "react";

const Topic = ({topic}) => {
  return (
    <span className="chip">
      {topic.name}
    </span>
  )
};

export default Topic