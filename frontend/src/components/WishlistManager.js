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
import WishlistModal from "./WishlistModal";
import FriendWishlist from "./FriendWishlist";

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

function WishlistManager(props) {
  const navigate = useNavigate();
  const [activeWishlist, setActiveWishlist] = useState({});
  const [wishlists, setWishlists] = useState([]);
  const [isEditingWL, setEditingWL] = useState(false);
  const [modalWL, setModalWL] = useState(false);
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
      .get(`http://localhost:8000/api/user/wishlists/${props.userId}/`)
      .then((response) => {
        // use map here?
        setWishlists(response.data);
        // this.setState({ wishlists: response.data });
      })
      .catch((error) => console.log(error));
  };

  useEffect(getWishlists, []);

  const toggleWL = () => {
    if (modalWL) {
      resetActiveWishlist();
    }
    setModalWL(!modalWL);
  };

  const addInputHandler = (e) => {
    let { name, value } = e.target;
    const updatedWishlist = { ...activeWishlist, [name]: value };
    setActiveWishlist(updatedWishlist);
  };

  const handleSubmit = () => {
    // this.state.editingWL ? this.updateWishlist() : this.addWishlist();
    isEditingWL ? updateWishlist() : addWishlist();
  };

  const setAddWishlistState = () => {
    // this.setState({ editing: false });
    setEditingWL(false);
    toggleWL();
  };

  const setEditWishlistState = (wishlist) => {
    setEditingWL(true);
    setActiveWishlist(wishlist);
    toggleWL();
  };
  //create WL button - extends at bottom of pg instead of Modal
  const addWishlist = () => {
    const wishlist = activeWishlist;
    wishlist.user = props.userId;
    console.log(wishlist);
    axios
      .post("http://localhost:8000/api/wishlist-create/", wishlist)
      .then((response) => {
        //add wishlist to end of list
        const newWishlist = response.data;
        console.log(newWishlist);
        newWishlists = wishlists.concat(newWishlist);
        setWishlists(newWishlists);
        toggleWL();
        // this.setState({ wishlists: this.state.wishlists.concat(wishlist) });
        //not sure if it'll be responsive and show new WL added
      })
      .catch((error) => console.log(error.response.data));
  };

  //edit WL Info button
  const updateWishlist = () => {
    const wishlist = activeWishlist;
    const foundIndex = wishlists.findIndex(
      (listItem) => listItem.id === wishlist.id
    );
    if (foundIndex !== -1) {
      axios
        .put(
          `http://localhost:8000/api/wishlist-update/${wishlist.id}/`,
          wishlist
        )
        .then((response) => {
          const wishlistCopy = [...wishlists];
          wishlistCopy[foundIndex] = wishlist;
          // this.resetActiveItem();
          setEditingWL(false);
          setWishlists(wishlistCopy);
          // this.setState({ editing: false, itemsList: listCopy });
          toggleWL();
          // renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  //Edit Items button: set activeWishlist on card click -> whole wishlist object
  const editItem = (wishlist) => {
    setActiveWishlist(wishlist);
    // this.setState({ activeWishlist: wishlist })
    // const navigate = useNavigate();
    navigate("/wishlist", { state: { wishlist: wishlist } });
  };

  //delete WL button
  const deleteWishlist = (wishlist) => {
    const foundWishlist = wishlists.find(
      (listItem) => wishlist.id === listItem.id
    );
    if (foundWishlist) {
      axios
        .delete(`http://localhost:8000/api/wishlist-delete/${wishlist.id}/`)
        .then((response) => {
          const filteredWishlist = wishlists.filter(
            (listItem) => listItem.id !== foundWishlist.id
          );
          setWishlists(filteredWishlist);
          // this.setState({ itemsList: filteredList });
          // renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  //WishlistViewer?

  const resetActiveWishlist = () => {
    const date = new Date();
    const emptyWishlist = {
      // setting defaults to fields
      id: undefined,
      user: undefined,
      title: "",
      description: "",
      created: date,
    };
    setActiveWishlist(emptyWishlist);
  };

  let newWishlists = wishlists;
  return (
    //cards for user's wishlists
    <div>
      <h3 className="text-center">My Wishlists</h3>
      <Button color="warning" onClick={setAddWishlistState}>
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
                <CardText>{wishlist.description}</CardText>
                <Button
                  color="info"
                  onClick={(e) => setEditWishlistState(wishlist)}
                >
                  Edit Info
                </Button>
                {/* set active wishlist and navigate  */}
                <Button color="primary" onClick={() => editItem(wishlist)}>
                  Edit Items
                </Button>
                <Button
                  color="danger"
                  onClick={(e) => deleteWishlist(wishlist)}
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </CardGroup>
      {modalWL ? (
        <WishlistModal
          toggle={toggleWL}
          open={modalWL}
          addInputHandler={addInputHandler}
          activeWishlist={activeWishlist}
          onSave={handleSubmit}
          isEditing={isEditingWL}
        />
      ) : null}
      <FriendWishlist userId={props.userId} />

      {/* //next page when wishlist is selected/clicked. Displays list of items of specific wishlist */}
      {/* <WishlistViewer activeWishlist={this.state.activeWishlist} /> */}
    </div>
  );
}

export default WishlistManager;
