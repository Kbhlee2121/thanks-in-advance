import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

const FriendWishlist = (props) => {
  const navigate = useNavigate();
  const [friendWishlists, setFriendWishlists] = useState([]);
  const [activeFriend, setActiveFriend] = useState({});

  const getFriendWishlists = () => {
    axios
      .get(`http://localhost:8000/api/friend-wishlists/${props.userId}/`)
      .then((response) => {
        // use map here?
        setFriendWishlists(response.data);
        // this.setState({ wishlists: response.data });
      })
      .catch((error) => console.log(error));
  };

  const viewWishlistHandler = (wishlist) => {
    setActiveFriend(wishlist);
    console.log(wishlist, activeFriend);
    navigate("/wishlist", {
      state: { wishlist: wishlist, friendViewing: true },
    });
  };

  useEffect(getFriendWishlists, []);

  return (
    //cards for friend wishlists
    <div>
      <h3 className="text-center">My Friends' Wishlists</h3>

      <CardGroup>
        {friendWishlists.map((wishlist) => {
          const date = new Date(wishlist.created);
          return (
            <Card
              className="shadow p-3 mb-5 bg-white rounded mx-2 my-2"
              key={wishlist.id}
              onClick={() => viewWishlistHandler(wishlist)}
            >
              <CardBody>
                <CardTitle tag="h5">{wishlist.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {`Created: ${
                    date.getMonth() + 1
                  }/${date.getDate()}/${date.getFullYear()}`}
                </CardSubtitle>
                <CardText>{wishlist.description}</CardText>
              </CardBody>
            </Card>
          );
        })}
      </CardGroup>
    </div>
  );
};

export default FriendWishlist;
