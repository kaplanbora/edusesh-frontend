import React from "react";
import SearchBar from "../containers/search-bar"
import {Link} from "react-router-dom";

const GuestNavbar = () => (
  <header className="navbar">
    <section className="navbar-section">
      <Link to="/" className="navbar-brand mr-2">Edusesh</Link>
    </section>
    <section className="navbar-section">
      <SearchBar/>
    </section>
    <section className="navbar-section">
      <Link to="/users/register?role=instructor" className="btn btn-link right-mg">Become an instructor</Link>
      <Link to="/users/login" className="btn btn-primary right-mg">Login</Link>
      <Link to="/users/register?role=trainee" className="btn btn-primary">Register</Link>
    </section>
  </header>
);

export default GuestNavbar