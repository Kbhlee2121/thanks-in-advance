import React, { Component } from "react";
import "./App.css";
import Modal from "./components/ItemModal";
import axios from "axios";

const items = [
  {
    id: 1,
    item_name: "sweater",
    item_description: "cropped earth color",
    claimed: false,
    item_link: null,
    item_image: null,
  },
  {
    id: 2,
    item_name: "waterbottle",
    item_description: "pink hydroflask",
    claimed: true,
    item_link: null,
    item_image: null,
  },
  {
    id: 3,
    item_name: "lotion",
    item_description: "for sensitive skin",
    claimed: false,
    item_link: null,
    item_image: null,
  },
  {
    id: 4,
    item_name: "speakers",
    item_description: "small and waterproof",
    claimed: true,
    item_link: null,
    item_image: null,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: {
        // setting defaults to fields
        id: null,
        item_name: "",
        item_description: "",
        claimed: false,
        item_link: null,
        item_image: null,
      },
      wishList: [],
      // editing lets us know if we're editing or submitting an item
      // editing: false,
    };
  }
  //componentDidMount - invoked after component is mounted(inserted into tree) to initiate network request if need to load data from a remote endpoint
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/items/")
      .then((response) => this.setState({ wishList: response.data }))
      .catch((error) => console.log(error));
  };

  // create toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    // Edit item
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/items/${item.id}/`, item)
        .then((response) => this.refreshList())
        .catch((error) => console.log(error));
    }
    axios
      .post("http://localhost:8000/api/create-item/", item)
      .then((response) => this.refreshList())
      .catch((error) => console.log(error));
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/delete-item/${item.id}/`)
      .then((response) => this.refreshList())
      .catch((error) => console.log(error));
  };

  createItem = () => {
    const item = { item_name: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
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
            onClick={(id) => this.handleSubmit(id)}
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
              value={this.state.activeItem.item_name}
              type="text"
              name="search"
              placeholder="Search item..."
            />
            <button className="btn btn-warning" onClick={this.handleSubmit}>
              Add Item
            </button>
          </form>
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
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
