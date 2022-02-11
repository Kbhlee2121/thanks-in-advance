import React, { Component } from "react";
import WishlistViewer from "./WishlistViewer";
import axios from "axios";
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

//handles CRUD for wishlists. activeWishlist to be set by GET wishlist
class WishlistManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeWishlist: null,
      wishlists: [],
      editingWL: false,
    };
  }

  // to perform operations that need to be executed when DOM is updated
  //called only when component gets updated or when the props passed to it change in App.js
  // componentDidUpdate() {
  //   this.getWishlists();
  // }

  componentDidMount() {
    this.getWishlists();
  }

  //view WL cards GET
  getWishlists = () => {
    axios
      .get("http://localhost:8000/api/wishlists/")
      .then((response) => {
        // use map here?
        this.setState({ wishlists: response.data });
      })
      .catch((error) => console.log(error));
  };

  handleSubmit = () => {
    this.state.editingWL ? this.updateWishlist() : this.addWishlist();
  };

  setAddWishlistState = () => {
    this.setState({ editing: false });
  };
  //create WL button - extends at bottom of pg instead of Modal
  addWishlist = () => {
    const wishlist = this.state.activeWishlist;
    axios
      .post("http://localhost:8000/api/wishlist-create/", wishlist)
      .then((response) => {
        //add wishlist to end of list
        this.setState({ wishlists: this.state.wishlists.concat(wishlist) });
        //not sure if it'll be responsive and show new WL added
      })
      .catch((error) => console.log(error.response.data));
  };

  //edit WL button

  //Edit Items button: set activeWishlist on card click -> whole wishlist object
  //WishlistViewer?
  //delete WL button

  render() {
    let newWishlists = this.state.wishlists;
    return (
      //cards for wishlists
      <div>
        <Button color="warning" onClick={this.addWishlist}>
          Add Wishlist
        </Button>
        <CardGroup>
          {newWishlists.map((wishlist) => {
            return (
              <Card key={wishlist.id}>
                <CardBody>
                  <CardTitle tag="h5">{wishlist.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Created: {wishlist.created}
                  </CardSubtitle>
                  <CardText>Description of wishlist</CardText>
                  <Button color="info">Edit Title</Button>
                  {/* set active wishlist and navigate  */}
                  <Button color="primary">Edit Items</Button>
                  <Button color="danger">Delete</Button>
                </CardBody>
              </Card>
            );
          })}
        </CardGroup>
        {/* //next page when wishlist is selected/clicked. Displays list of items of specific wishlist */}
        {/* <WishlistViewer activeWishlist={this.state.activeWishlist} /> */}
      </div>
    );
  }
}

export default WishlistManager;
