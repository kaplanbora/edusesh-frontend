import React, {Component} from "react";
import SearchBar from "./search-bar"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getCredentials, getProfile} from "../actions/user";
import UserMenu from "../components/user-menu";

class UserNavbar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const token = this.props.token;
    this.props.loadProfile(token);
    this.props.loadCredentials(token);
  }

  render() {
    const credentials = this.props.user.credentials;
    const profile = this.props.user.profile;
    return (
      <header className="navbar">
        <section className="navbar-section">
          <Link to="/" className="navbar-brand mr-2">Edusesh</Link>
        </section>
        <section className="navbar-section">
          <SearchBar/>
        </section>
        <section className="navbar-section">
          <UserMenu profile={profile} credentials={credentials}/>
        </section>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loadCredentials: token => dispatch(getCredentials(token)),
  loadProfile: token => dispatch(getProfile(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar)