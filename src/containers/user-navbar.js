import React, {Component} from "react";
import SearchBar from "./search-bar"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getCredentials, getProfile} from "../actions/load";
import {logout} from "../actions/auth";
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
      <header className="navbar p-2 bg-dark">
        <section className="navbar-section">
          <Link to="/" className="navbar-brand mr-2 text-light">Edusesh</Link>
        </section>
        <section className="navbar-section">
          <SearchBar/>
        </section>
        <section className="navbar-section">
          <UserMenu profile={profile} credentials={credentials} onLogout={this.props.onLogout}/>
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
  loadProfile: token => dispatch(getProfile(token)),
  onLogout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar)