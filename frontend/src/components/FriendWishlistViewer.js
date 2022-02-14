import React, { useEffect, useState } from "react";
import ViewItemModal from "./ViewItemModal";
import ItemModal from "./ItemModal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ItemsList from "./ItemList";
import { Link } from "react-router-dom";

const FriendWishlistViewer = () => {
  const location = useLocation();

  const getItemsList = () => {
    const currentWishlist = location.state.wishlist;
    setActiveWishlist(currentWishlist);
    console.log(currentWishlist);
    axios
      .get(`http://localhost:8000/api/items-wishlist/${currentWishlist.id}/`)
      .then((response) => {
        console.log("in getItemsList");
        const itemsList = response.data;
        console.log(itemsList);
        setItemsList(itemsList);
      })
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    console.log("updating!");
    getItemsList();
  }, []);

  return (

  )
}

export default FriendWishlistViewer;