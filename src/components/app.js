import React from "react";
import style from "../../style/master.css";
import spectre from "../../style/spectre.min.css";
import NavbarGuest from "./guest-navbar"
import RegisterPage from "../containers/register-page"
import {BrowserRouter, Route} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavbarGuest/>
        <Route path="/users/register" component={RegisterPage}/>
      </div>
    </BrowserRouter>
  );
};

export default App
