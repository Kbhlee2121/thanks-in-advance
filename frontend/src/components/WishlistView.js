import React, { Component } from "react";
import Item from "./Item";
import ViewItemModal from "./ViewItemModal";
import ItemModal from "./ItemModal";
import axios from "axios";

//displays list of items of selected wishlist. Handles CRUD Modals of Items
class WishlistViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeWishlist: this.props.activeWishlist,
      itemsList: [],
      filteredList: [],
      activeItem: {},
      modal: false,
      // editing lets us know if we're editing or submitting an item
      editing: false,
      viewing: false,
    };
  }

  //componentDidMount - invoked after component is mounted(inserted into tree) to initiate network request if need to load data from a remote endpoint
  componentDidMount() {
    this.getItemsList();
  }

  resetActiveItem = () => {
    const emptyItem = {
      // setting defaults to fields
      id: null,
      item_name: "",
      item_description: "",
      claimed: false,
      item_link: null,
      item_image: null,
      wishlist: null,
    };
    this.setState({ activeItem: emptyItem });
  };

  handleModalFieldChange = (e) => {
    let { name, value } = e.target;
    // console.log(name, value);
    if (e.target.type === "checkbox") {
      // changes default in the state for edits
      const checked = !this.state.activeItem.claimed;
      e.target.checked = checked;
      const activeItem = { ...this.state.activeItem, claimed: checked };
      this.setState({ activeItem });
      return;
    } else if (e.target.type === "file") {
      this.onImageChange(e);
      return;
    } else {
      const updatedItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem: updatedItem });
    }
  };

  toggle = () => {
    // If the modal is open and we're toggling it off, we should reset the active item
    if (this.state.modal) {
      this.resetActiveItem();
    }
    this.setState({ modal: !this.state.modal });
  };

  handleModalSubmit = () => {
    // Backend does not like _ in Urls or ones that are over 200 characters
    // This should catch most* Urls
    if (
      this.state.activeItem.item_link &&
      this.state.activeItem.item_link.length > 200
    ) {
      let shortLink = this.state.activeItem.item_link
        .split("?")[0] // most things after ? is optional
        .slice(0, 200) // ensure max length
        .replace(/_/g, ""); // remove all underscores
      console.log(`Link too long, new link is: ${shortLink}`, shortLink.length);
      this.setState({
        activeItem: {
          item_link: shortLink,
        },
      });
    }

    this.state.editing ? this.updateItem() : this.addItem();
  };

  // list of items of selected wishlist
  getItemsList = () => {
    axios
      .get(
        `http://localhost:8000/api/items-wishlist/${this.state.activeWishlist.id}`
      )
      .then((response) => this.setState({ itemsList: response.data }))
      .catch((error) => console.log(error));
  };

  detailViewItem = (item) => {
    const foundItem = this.state.itemsList.find(
      (listItem) => item.id === listItem.id
    );
    if (foundItem) {
      this.setState({ activeItem: foundItem, viewing: true });
      this.toggle();
    }
  };

  setAddItemState = () => {
    this.setState({
      editing: false,
      viewing: false,
    });
    // this.resetActiveItem();
    this.toggle();
  };

  addItem = () => {
    let item = this.state.activeItem;
    item.wishlist_id = this.state.activeWishlist;
    axios
      .post("http://localhost:8000/api/item-create/", item)
      .then((response) => {
        //concat adds item to end of list
        this.setState({ itemsList: this.state.itemsList.concat(item) });
        this.renderItems();
        this.toggle();
        // this.resetActiveItem();
      })
      .catch((error) => console.log(error));
  };

  setEditItemState = (item) => {
    this.setState({
      editing: true,
      viewing: false,
      activeItem: item,
    });
    this.toggle();
  };

  updateItem = () => {
    const item = this.state.activeItem;
    const foundIndex = this.state.itemsList.findIndex(
      (listItem) => listItem.id === item.id
    );
    if (foundIndex !== -1) {
      axios
        .put(`http://localhost:8000/api/item-update/${item.id}/`, item)
        .then((response) => {
          const listCopy = [...this.state.itemsList];
          listCopy[foundIndex] = item;
          // this.resetActiveItem();
          this.setState({ editing: false, itemsList: listCopy });
          this.toggle();
          this.renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  deleteItem = (item) => {
    const foundItem = this.state.itemsList.find(
      (listItem) => item.id === listItem.id
    );
    if (foundItem) {
      axios
        .delete(`http://localhost:8000/api/item-delete/${item.id}/`)
        .then((response) => {
          const filteredList = this.state.itemsList.filter(
            (listItem) => listItem.id !== foundItem.id
          );
          this.setState({ itemsList: filteredList });
          this.renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  searchWishList = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
      const filtered = this.state.itemsList.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        this.setState({ filteredList: filtered });
        this.renderItems();
      }
    } else {
      this.setState({ filteredList: [] });
      this.renderItems();
    }
  };

  // rendering items in the wishlist
  renderItems = () => {
    let newItems = [];
    if (this.state.filteredList.length > 0) {
      newItems = this.state.filteredList;
    } else {
      newItems = this.state.itemsList;
    }
    return newItems.map((item) => (
      <Item
        item={item}
        detailViewItem={this.detailViewItem}
        setEditItemState={this.setEditItemState}
        deleteItem={this.deleteItem}
      />
    ));
  };

  render() {
    return (
      <div>
        <div className="item-container">
          <form id="form">
            <input
              className="form-control"
              id="search-item"
              type="text"
              name="search"
              placeholder="Search item..."
              onChange={this.searchWishList}
            />
          </form>
          <button className="btn btn-warning" onClick={this.setAddItemState}>
            Add Item
          </button>
        </div>
        <div id="list-wrapper">
          <ul className="list-group list-group-flush">{this.renderItems()}</ul>
        </div>

        {this.state.modal ? (
          this.state.viewing ? (
            <ViewItemModal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
            />
          ) : (
            <ItemModal
              activeItem={this.state.activeItem}
              handleFieldChange={this.handleModalFieldChange}
              toggle={this.toggle}
              onSave={this.handleModalSubmit}
              isEditing={this.state.editing}
            />
          )
        ) : null}
      </div>
    );
  }
}

export default WishlistViewer;
