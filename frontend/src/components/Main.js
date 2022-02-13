import React from "react";
import WishlistManager from "./WishlistManager";
import { Link } from "react-router-dom";
import User from "./User";

const Main = (props) => {
  return (
    <div>
      <header>
        {/* reactstrap breadcrumb? */}
        {/* Logout instead of home? */}
        <Link to="/">Home</Link>
        <h1>Thanks in Advance</h1>
        <h3>
          Signed in as <b>{props.user.username}</b>
        </h3>
      </header>
      <User user={props.user} />
      {/* // display cards of wishlists */}
      <WishlistManager userId={props.user.id} />
    </div>
  );
};

export default Main;
