import React from "react";
import {connect} from "react-redux";
import UserHome from "./user-home";
import {LandingPage} from "../components/LandingPage";

const HomePage = ({token}) =>
  token
    ? <UserHome token={token}/>
    : <LandingPage/>;


const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps, null)(HomePage)