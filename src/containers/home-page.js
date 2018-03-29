import React from "react";
import {connect} from "react-redux";
import UserHome from "./user-home";

const HomePage = ({token}) =>
  token
    ? <UserHome token={token}/>
    : <div>Yo</div>;


const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps, null)(HomePage)