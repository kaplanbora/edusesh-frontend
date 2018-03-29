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
        <div>
          <Navbar token={this.props.token}/>
          <div className="container">
            <Route exact path="/" component={HomePage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route exact path="/user" component={SettingsPage}/>
            <Route path="/user/:id" component={PublicUser}/>
          </div>
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
