import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
// class WishlistManager extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeWishlist: null,
//       wishlists: [],
//       editingWL: false,
//     };
//   }

function WishlistManager() {
  const navigate = useNavigate();
  const [activeWishlist, setActiveWishlist] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [isEditingWL, setEditingWL] = useState(false);
  // to perform operations that need to be executed when DOM is updated
  //called only when component gets updated or when the props passed to it change in App.js
  // componentDidUpdate() {
  //   this.getWishlists();
  // }

  // componentDidMount() {
  //   this.getWishlists();
  // }

  //view WL cards GET
  const getWishlists = () => {
    axios
      .get("http://localhost:8000/api/wishlists/")
      .then((response) => {
        // use map here?
        setWishlists(response.data);
        // this.setState({ wishlists: response.data });
      })
      .catch((error) => console.log(error));
  };

  useEffect(getWishlists, []);

  const handleSubmit = () => {
    // this.state.editingWL ? this.updateWishlist() : this.addWishlist();
    isEditingWL ? updateWishlist() : addWishlist();
  };

  const setAddWishlistState = () => {
    // this.setState({ editing: false });
    setEditingWL(false);
  };
  //create WL button - extends at bottom of pg instead of Modal
  const addWishlist = () => {
    const wishlist = activeWishlist;
    axios
      .post("http://localhost:8000/api/wishlist-create/", wishlist)
      .then((response) => {
        //add wishlist to end of list
        newWishlists = wishlists.concat(wishlist);
        setWishlists(newWishlists);
        // this.setState({ wishlists: this.state.wishlists.concat(wishlist) });
        //not sure if it'll be responsive and show new WL added
      })
      .catch((error) => console.log(error.response.data));
  };

  //edit WL Info button
  const updateWishlist = (wishlist) => {};

  //Edit Items button: set activeWishlist on card click -> whole wishlist object
  const editItem = (wishlist) => {
    setActiveWishlist(wishlist);
    // this.setState({ activeWishlist: wishlist })
    // const navigate = useNavigate();
    navigate("/wishlist", { state: { wishlist: wishlist } });
  };

  //delete WL button
  //  const deleteWishlist = (wishlist) => {

  //  }

  //WishlistViewer?

  let newWishlists = wishlists;
  return (
    //cards for wishlists
    <div>
      <Button color="warning" onClick={addWishlist}>
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
                <Button color="info">Edit Info</Button>
                {/* set active wishlist and navigate  */}
                <Button color="primary" onClick={() => editItem(wishlist)}>
                  Edit Items
                </Button>
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

export default WishlistManager;
