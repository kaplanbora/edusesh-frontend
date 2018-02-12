import React from "react";
import SearchBar from "../containers/search-bar"

const NavbarGuest = () => (
  <header className="navbar">
    <section className="navbar-section">
      <a href="#" className="navbar-brand mr-2">Edusesh</a>
    </section>
    <section className="navbar-section">
      <SearchBar/>
    </section>
    <section className="navbar-section">
      <a href="#" className="btn btn-link">Login</a>
      <a href="#" className="btn btn-link">Register</a>
    </section>
  </header>
);

export default NavbarGuest