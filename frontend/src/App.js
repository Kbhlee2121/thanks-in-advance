import React from "react";
import "./App.css";

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishList: items,
      activeItem: {
        // setting defaults to fields
        id: null,
        item_name: "",
        item_description: "",
        claimed: false,
        item_link: null,
        item_image: null,
      },
      // editing lets us know if we're editing or submitting an item
      editing: false,
    };
  }

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
      </li>
    ));
  };

  render() {
    return (
      <div className="container">
        <h1>Thanks in Advance</h1>
        <div className="item-container">
          <form id="form">
            <input
              className="form-control"
              id="item-name"
              value={this.state.activeItem.item_name}
              type="text"
              name="item-name"
              placeholder="Add item..."
            />
            <input
              id="submit"
              className="btn btn-warning"
              type="submit"
              name="add"
            />
          </form>
        </div>
        <div id="list-wrapper">
          <ul className="list-group list-group-flush">{this.renderItems()}</ul>
        </div>
      </div>
    );
  }
}

export default App;
