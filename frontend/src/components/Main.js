import React, { Component } from "react";
import WishlistManager from "./WishlistManager";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // display cards of wishlists
      <WishlistManager />
    );
  }
}

export default Main;
