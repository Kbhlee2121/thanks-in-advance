import React from "react";
import WishlistManager from "./WishlistManager";
import { Link } from "react-router-dom";
import User from "./User";
import { Button } from "reactstrap";

const Main = (props) => {
  return (
    <div>
      <h2 className="text-center">My Dashboard</h2>
      <h4>Signed in as {props.user.username}</h4>
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
