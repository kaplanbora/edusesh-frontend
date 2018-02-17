import React, {Component} from "react";
import style from "../../style/master.css";
import spectre from "../../style/spectre.min.css";
import Navbar from "../components/navbar"
import {connect} from "react-redux";
import RegisterPage from "./register-page"
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
          <Route path="/users/register" component={RegisterPage}/>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  loadToken: () => {
    dispatch(tokenFromCookie())
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(App)
