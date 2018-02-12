import React from "react";
import ReactDOM from "react-dom";
import "../style/master.css";

function Hello(props) {
  return (
    <div>Hello</div>
  );
}

ReactDOM.render(<Hello/>, document.querySelector("#root"));
