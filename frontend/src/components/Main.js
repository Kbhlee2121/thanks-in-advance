import React from "react";
import WishlistManager from "./WishlistManager";
import { Link } from "react-router-dom";
import User from "./User";
import { Button } from "reactstrap";

const Main = (props) => {
  return (
    <div>
      <header>
        {/* reactstrap breadcrumb? */}
        {/* Logout instead of home? */}
        <Link to="/">Home</Link>
        <Button color="danger" onClick={props.logout}>
          Logout
        </Button>
        <h1>Thanks in Advance</h1>
        <h2 className="text-center">My Dashboard</h2>
        <h3>
          Signed in as <b>{props.user.username}</b>
        </h3>
      </header>
      <details>
        <summary>
          <span className="h3">See User Profile</span>
        </summary>
        <User user={props.user} />
      </details>

      {/* // display cards of wishlists */}
      <WishlistManager userId={props.user.id} />
    </div>
  );
};

export default Main;
