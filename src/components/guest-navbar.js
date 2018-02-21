import React from "react";
import SearchBar from "../containers/search-bar"
import {Link} from "react-router-dom";

const GuestNavbar = () => (
  <header className="navbar p-2">
    <section className="navbar-section">
      <Link to="/" className="navbar-brand mr-2">Edusesh</Link>
    </section>
    <section className="navbar-section">
      <SearchBar/>
    </section>
    <section className="navbar-section">
      <Link to="/register?role=instructor" className="btn btn-link mx-2">Become an instructor</Link>
      <Link to="/login" className="btn btn-primary mx-2 mr-2">Login</Link>
      <Link to="/register?role=trainee" className="btn btn-primary">Register</Link>
    </section>
  </header>
);

export default GuestNavbar