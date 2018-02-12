import React from "react";
import style from "../../style/master.css";
import NavbarGuest from "./navbar-guest"
import RegisterPage from "../containers/register-page"

const App = () => {
  return (
    <div>
      <NavbarGuest/>
      <RegisterPage/>
    </div>
  );
};

export default App
