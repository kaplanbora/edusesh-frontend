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
import SessionPage from "./session-page";
import {BrowserRouter, Route} from "react-router-dom";
import {tokenFromCookie} from "../actions";
import SearchPage from "./search-page";

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
          <Route path="/session/:id" component={SessionPage}/>
          <Route path="/search" component={SearchPage}/>
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
