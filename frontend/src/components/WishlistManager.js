import React, { Component } from "react";
import WishlistViewer from "./WishlistView";
import axios from "axios";

//handles CRUD for wishlists. activeWishlist to be set by GET wishlist
class WishlistManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeWishlist: null,
      wishlists: [],
    };
  }

  // look into componentdidupdate

  //view WL cards GET
  getWishlists = () => {
    axios
      .get("http://localhost:8000/api/wishlists/")
      .then((response) => this.setState({ wishlists: response.data }))
      .catch((error) => console.log(error));
  };

  //create WL button - extends at bottom of pg instead of Modal

  //edit WL button

  //delete WL button

  render() {
    return (
      //rendering wishlists?
      // this.getWishlists()
      //cards for wishlists

      //next page when wishlist is selected/clicked. Displays list of items of specific wishlist
      <WishlistViewer activeWishlist={this.state.activeWishlist} />
    );
  }
}

export default WishlistManager;
