import React from "react";

const Header = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-gradient-info">
        <div className="container-fluid d-flex">
          <div className="d-flex flex-row">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <p className="nav-link active" onClick={props.logout}>
              Logout
            </p>
          </div>

          <h3 className="ml-auto p-2 align-self-end">Thanks in Advance</h3>
        </div>
      </nav>
    </div>
  );
};

export default Header;
