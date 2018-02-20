import React from "react";

const UserMenu = ({credentials, profile, notifications}) => {
  if (!Object.keys(credentials).length || !Object.keys(profile).length) {
    return (
      <div>
        <button className="btn btn-link loading"/>
      </div>
    );
  }

  const image = profile.imageLink ? profile.imageLink : `https://robohash.org/${credentials.id}?set=set3`;
  const greeter = profile.firstName ? `Hello, ${profile.firstName}` : credentials.email.split("@")[0];
  const initials = profile.firstName && profile.lastName ?
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}` :
    `${credentials.email.substring(0, 2)}`;

  return (
    <div className="columns">
      <div className="column col-4 col-xs-12">

        <div className="dropdown dropdown-right">
          <figure className="avatar badge dropdown-toggle" tabIndex="0" data-badge={notifications ? notifications.length : 0}
                  data-initial={initials}>
            <img alt={initials} src={image}/>
          </figure>

          <ul className="menu">

            <li className="menu-item">
              <div className="tile tile-centered">
                <div className="tile-icon">
                  <img src={image} className="avatar" alt="Avatar"/>
                </div>
                <div className="tile-content">
                  {greeter}
                </div>
              </div>
            </li>

            <li className="divider"/>

            <li className="menu-item">
              <div className="menu-badge">
                <label className="label label-primary">{notifications ? notifications.length : 0}</label>
              </div>
              <a href="#menus" className="active"> Notifications </a>
            </li>
            <li className="menu-item">
              <a href="#menus"> Settings </a>
            </li>
            <li className="menu-item">
              <a href="#menus"> Logout </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default UserMenu