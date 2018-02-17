import React, {Component} from "react";
import SearchBar from "./search-bar"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getCredentials, getProfile} from "../actions/user";

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
          <figure className="avatar badge" data-badge="8" data-initial="YZ">
            <img alt={"AT"}
                 src={profile.imageLink ? profile.imageLink :
                   `https://robohash.org/${credentials.id}?set=set3`}
            />
          </figure>
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