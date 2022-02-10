import React, { Component } from "react";
import Modal from "./ItemModal";
import ViewItemModal from "./ViewItemModal";
import Items from "./Items";
import axios from "axios";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: this.props.activeItem,
      wishList: [],
      filteredWishList: [],
    };
  }

  //create wishlist - title, date
  //update wishlist - title
  //delete wishlist

  // componentDidMount() {
  //   this.getItemsList();
  // }

  // getItemsList = () => {
  //   axios
  //     .get("http://localhost:8000/api/items/")
  //     .then((response) => this.setState({ wishList: response.data }))
  //     .catch((error) => console.log(error));
  // };

  // // ????
  // getItemsOfWishlist = (wishlist) => {
  //   axios
  //     .get(`http://localhost:8000/api/items-wishlist/${wishlist.id}`)
  //     .then((response) => this.setState({ wishList: response.data }))
  //     .catch((error) => console.log(error));
  // };
  // //checks if checkbox is checked or not
  // handleModalFieldChange = (e) => {
  //   let { name, value } = e.target;
  //   // console.log(name, value);
  //   if (e.target.type === "checkbox") {
  //     // changes default in the state for edits
  //     const checked = !this.state.activeItem.claimed;
  //     e.target.checked = checked;
  //     const activeItem = { ...this.state.activeItem, claimed: checked };
  //     this.setState({ activeItem });
  //     return;
  //   } else if (e.target.type === "file") {
  //     this.onImageChange(e);
  //     return;
  //   } else {
  //     const updatedItem = { ...this.state.activeItem, [name]: value };
  //     this.setState({ activeItem: updatedItem });
  //   }
  // };

  // handleModalSubmit = () => {
  //   this.state.editing ? this.updateItem() : this.addItem();
  // };

  // searchWishList = (e) => {
  //   const searchTerm = e.target.value;
  //   if (searchTerm.length > 0) {
  //     const filtered = this.state.wishList.filter((item) =>
  //       item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     if (filtered.length > 0) {
  //       this.setState({ filteredWishList: filtered });
  //       this.renderItems();
  //     }
  //   } else {
  //     this.setState({ filteredWishList: [] });
  //     this.renderItems();
  //   }
  // };

  // render() {
  //   const { setAddItemState, toggle, activeItem } = this.props;
  //   // ensures copyright year is always up to date. date = new date object

  //   return (
  //     <main className="container">
  //       <h2>
  //         Wishlist: <span></span>
  //       </h2>
  //       <div className="item-container">
  //         <form id="form">
  //           <input
  //             className="form-control"
  //             id="search-item"
  //             // value={this.state.activeItem.item_name}
  //             type="text"
  //             name="search"
  //             placeholder="Search item..."
  //             onChange={this.searchWishList}
  //           />
  //         </form>
  //         <button className="btn btn-warning" onClick={setAddItemState}>
  //           Add Item
  //         </button>
  //       </div>
  //       <div id="list-wrapper">
  //         <ul className="list-group list-group-flush">
  //           {/* {renderItems} */}
  //           <Items activeItem={activeItem} getItemsList={this.getItemsList} />
  //         </ul>
  //       </div>
  //       {/* activeItem represents item that is to be edited. Toggle determines state (open or closed) of Modal. onSave saves item */}
  //       {this.state.modal ? (
  //         this.state.viewing ? (
  //           <ViewItemModal activeItem={activeItem} toggle={toggle} />
  //         ) : (
  //           <Modal
  //             activeItem={activeItem}
  //             handleFieldChange={this.handleModalFieldChange}
  //             toggle={toggle}
  //             onSave={this.handleModalSubmit}
  //             isEditing={this.state.editing}
  //           />
  //         )
  //       ) : null}
  //     </main>
  //   );
  // }

  render() {
    return (
      <div>
        <button className="btn btn-warning">Add Wishlist</button>
      </div>
    );
  }
}

export default Wishlist;
