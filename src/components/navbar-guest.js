import React from "react";
import SearchBar from "../containers/search-bar"
import {Link} from "react-router-dom";

const NavbarGuest = () => (
  <header className="navbar">
    <section className="navbar-section">
      <Link to="/" className="navbar-brand mr-2">Edusesh</Link>
    </section>
    <section className="navbar-section">
      <SearchBar/>
    </section>
    <section className="navbar-section">
      <Link to="/users/login" className="btn btn-link">Login</Link>
      <Link to="/users/register" className="btn btn-link">Register</Link>
    </section>
  </header>
);

export default NavbarGuest