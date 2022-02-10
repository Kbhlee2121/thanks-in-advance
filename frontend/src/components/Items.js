// import React, { Component } from "react";
// import axios from "axios";

// class Items extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeItem: this.props.activeItem,
//       wishList: [],
//       filteredWishList: [],
//       // editing lets us know if we're editing or submitting an item
//       editing: false,
//       viewing: false,
//     };
//   }

//   detailViewItem = (item) => {
//     const foundItem = this.state.wishList.find(
//       (wishListItem) => item.id === wishListItem.id
//     );
//     if (foundItem) {
//       this.setState({ activeItem: foundItem, viewing: true });
//       this.toggle();
//     }
//   };

//   setAddItemState = () => {
//     this.setState({
//       editing: false,
//       viewing: false,
//     });
//     // this.resetActiveItem();
//     this.toggle();
//   };

//   addItem = () => {
//     const item = this.state.activeItem;
//     axios
//       .post("http://localhost:8000/api/item-create/", item)
//       .then((response) => {
//         // const updatedList = this.state.wishList.push(item)
//         //concat adds item to end of list
//         this.setState({ wishList: this.state.wishList.concat(item) });
//         this.renderItems();
//         this.toggle();
//         // this.resetActiveItem();
//       })
//       .catch((error) => console.log(error));
//   };

//   setEditItemState = (item) => {
//     this.setState({
//       editing: true,
//       viewing: false,
//       activeItem: item,
//     });
//     this.toggle();
//   };

//   updateItem = () => {
//     const item = this.state.activeItem;
//     const foundIndex = this.state.wishList.findIndex(
//       (wishListItem) => wishListItem.id === item.id
//     );
//     if (foundIndex !== -1) {
//       axios
//         .put(`http://localhost:8000/api/item-update/${item.id}/`, item)
//         .then((response) => {
//           const wishListCopy = [...this.state.wishList];
//           wishListCopy[foundIndex] = item;
//           // this.resetActiveItem();
//           this.setState({ editing: false, wishList: wishListCopy });
//           this.toggle();
//           this.renderItems();
//         })
//         .catch((error) => console.log(error));
//     } else {
//       console.log("Item not found");
//     }
//   };

//   deleteItem = (item) => {
//     const foundItem = this.state.wishList.find(
//       (wishListItem) => item.id === wishListItem.id
//     );
//     if (foundItem) {
//       axios
//         .delete(`http://localhost:8000/api/item-delete/${item.id}/`)
//         .then((response) => {
//           const filteredWishList = this.state.wishList.filter(
//             (wishListItem) => wishListItem.id !== foundItem.id
//           );
//           this.setState({ wishList: filteredWishList });
//           this.renderItems();
//         })
//         .catch((error) => console.log(error));
//     } else {
//       console.log("Item not found");
//     }
//   };

//   render() {
//     const { getItemsList } = this.props;
//     let newItems = [];
//     if (this.state.filteredWishList.length > 0) {
//       newItems = this.state.filteredWishList;
//     } else {
//       newItems = this.state.wishList;
//     }
//     getItemsList();
//     return newItems.map((item) => (
//       <li
//         key={item.id}
//         className="list-group-item d-flex justify-content-between align-items-center"
//       >
//         {/* add onClick for getlist */}
//         {item.claimed === false ? (
//           <span onClick={(e) => this.detailViewItem(item)}>
//             {item.item_name}
//           </span>
//         ) : (
//           <strike onClick={(e) => this.detailViewItem(item)}>
//             {item.item_name}
//           </strike>
//         )}
//         <span>
//           <button
//             className="btn btn-info mr-2 btn-sm"
//             onClick={(e) => this.setEditItemState(item)}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-danger mr-2 btn-sm"
//             onClick={(e) => this.deleteItem(item)}
//           >
//             Delete
//           </button>
//         </span>
//       </li>
//     ));
//   }
// }

// export default Items;
