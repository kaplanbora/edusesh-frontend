import React from "react";
import SearchBar from "../containers/search-bar"
import {Link} from "react-router-dom";
import LoginPage from "../containers/login-page"

const GuestNavbar = () => (
  <header className="navbar p-2 bg-dark">
    <section className="navbar-section">
      <Link to="/" className="navbar-brand mr-2 text-light">Edusesh</Link>
    </section>
    <section className="navbar-section">
      <SearchBar/>
    </section>
    <section className="navbar-section">
      <Link to="/register?role=instructor" className="mx-2 text-light">Become an instructor</Link>
      <LoginPage/>
      <Link to="/register?role=trainee" className="btn btn-success">Register</Link>
    </section>
  </header>
);

export default GuestNavbar