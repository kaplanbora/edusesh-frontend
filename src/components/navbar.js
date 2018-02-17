import React from "react";
import GuestNavbar from "../components/guest-navbar"
import UserNavbar from "../containers/user-navbar"

const Navbar = ({token}) => {
  return (
    <header>
      {token ? <UserNavbar token={token}/> : <GuestNavbar/>}
    </header>
  );
};

export default Navbar