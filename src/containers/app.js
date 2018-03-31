import React, {Component} from "react";
import spectre from "../../style/spectre.min.css";
import spectre_icons from "../../style/spectre-icons.min.css";
import style from "../../style/master.css";
import Navbar from "../components/navbar"
import HomePage from "../containers/home-page"
import {connect} from "react-redux";
import RegisterPage from "./register-page"
import SettingsPage from "./settings-page"
import PublicUser from "./public-user";
import LiveSession from "./live-session";
import {BrowserRouter, Route} from "react-router-dom";
import {tokenFromCookie} from "../actions";

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadToken();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Navbar token={this.props.token}/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route exact path="/user" component={SettingsPage}/>
          <Route path="/user/:id" component={PublicUser}/>
          <Route path="/session/:id" component={LiveSession}/>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  loadToken: () => dispatch(tokenFromCookie())
});


export default connect(mapStateToProps, mapDispatchToProps)(App)
