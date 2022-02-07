import React, { Component } from "react";
import "./App.css";
import Modal from "./components/ItemModal";
import axios from "axios";

// const items = [
//   {
//     id: 1,
//     item_name: "sweater",
//     item_description: "cropped earth color",
//     claimed: false,
//     item_link: null,
//     item_image: null,
//   },
//   {
//     id: 2,
//     item_name: "waterbottle",
//     item_description: "pink hydroflask",
//     claimed: true,
//     item_link: null,
//     item_image: null,
//   },
//   {
//     id: 3,
//     item_name: "lotion",
//     item_description: "for sensitive skin",
//     claimed: false,
//     item_link: null,
//     item_image: null,
//   },
//   {
//     id: 4,
//     item_name: "speakers",
//     item_description: "small and waterproof",
//     claimed: true,
//     item_link: null,
//     item_image: null,
//   },
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: {
        // // setting defaults to fields
        // id: null,
        // item_name: null,
        // item_description: null,
        // claimed: false,
        // item_link: null,
        // item_image: null,
      },
      wishList: [],
      // editing lets us know if we're editing or submitting an item
      editing: false,
    };
  }
  //componentDidMount - invoked after component is mounted(inserted into tree) to initiate network request if need to load data from a remote endpoint
  componentDidMount() {
    this.resetActiveItem();
    this.getItemsList();
  }

  resetActiveItem = () => {
    const emptyItem = {
      // setting defaults to fields
      id: null,
      item_name: null,
      item_description: null,
      claimed: false,
      item_link: null,
      item_image: null,
    };
    this.setState({ activeItem: emptyItem });
  };

  getItemsList = () => {
    axios
      .get("http://localhost:8000/api/items/")
      .then((response) => this.setState({ wishList: response.data }))
      .catch((error) => console.log(error));
  };

  //checks if checkbox is checked or not
  handleModalFieldChange = (e) => {
    console.log(e, e.target);
    let { name, value } = e.target;
    console.log(name, value);
    if (e.target.type === "checkbox") {
      // const checkbox = e.target;
      // displays check
      // checkbox.click();
      // changes default in the state for edits
      const checked = !this.state.activeItem.claimed;
      e.target.checked = checked;
      const activeItem = { ...this.state.activeItem, claimed: checked };
      this.setState({ activeItem });
      // const checked = !this.state.claimed;
      return;
    }
    //if url
    // if file

    const updatedItem = { ...this.state.activeItem, [name]: value };
    console.log(`This is the active item ${JSON.stringify(updatedItem)}`);
    this.setState({ activeItem: updatedItem });
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // create toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleModalSubmit = (e) => {
    // this.state.isEditing ?
    this.addItem();
    // Edit item
    // if (item.id) {
    //   axios
    //     .put(`http://localhost:8000/api/items/${item.id}/`, item)
    //     .then((response) => this.refreshList())
    //     .catch((error) => console.log(error));
    // }
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/delete-item/${item.id}/`)
      .then((response) => this.renderItems())
      .catch((error) => console.log(error));
  };

  addItem = () => {
    const item = this.state.activeItem;
    axios
      .post("http://localhost:8000/api/create-item/", item)
      .then((response) => {
        // const updatedList = this.state.wishList.push(item)
        //concat adds item to end of list
        this.setState({ wishList: this.state.wishList.concat(item) });
        this.renderItems();
        this.toggle();
        this.resetActiveItem();
      })
      .catch((error) => console.log(error));
  };

  editItem = (item) => {
    console.log(item);
    this.setState({
      editing: true,
      activeItem: item,
      modal: !this.state.modal,
    });
  };

  updateItem = () => {
    const item = this.state.activeItem;
    const foundItem = this.state.wishList.find(
      (wishListItem) => item.id === wishListItem.id
    );
    if (foundItem) {
      axios
        .put(`http://localhost:8000/api/items/${item.id}/`, item)
        .then((response) => {
          this.renderItems();
          this.resetActiveItem();
          this.setState({ editing: false });
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  // rendering items in the wishlist
  renderItems = () => {
    const newItems = this.state.wishList;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        {item.claimed === false ? (
          <span>{item.item_name}</span>
        ) : (
          <strike>{item.item_name}</strike>
        )}
        <span>
          <button
            className="btn btn-info mr-2 btn-sm"
            onClick={(e) => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mr-2 btn-sm"
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1>Thanks in Advance</h1>
        <div className="item-container">
          <form id="form">
            <input
              className="form-control"
              id="search-item"
              // value={this.state.activeItem.item_name}
              type="text"
              name="search"
              placeholder="Search item..."
            />
          </form>
          <button className="btn btn-warning" onClick={this.toggle}>
            Add Item
          </button>
        </div>
        <div id="list-wrapper">
          <ul className="list-group list-group-flush">{this.renderItems()}</ul>
        </div>
        <footer className="my-5 mb-2 text-center">
          Copyright 2022 &copy; All Rights Reserved{" "}
        </footer>
        {/* activeItem represents item that is to be edited. Toggle determines state (open or closed) of Modal. onSave saves item */}
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            handleFieldChange={this.handleModalFieldChange}
            toggle={this.toggle}
            onSave={this.handleModalSubmit}
            isEditing={this.state.editing}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
