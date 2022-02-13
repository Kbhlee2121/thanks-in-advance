import React from "react";

const Item = (props) => {
  const { item, detailViewItem, setEditItemState, deleteItem } = props;
  return (
    <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      {/* add onClick for getlist */}
      {item.claimed === false ? (
        <span onClick={(e) => detailViewItem(item)}>{item.item_name}</span>
      ) : (
        <strike onClick={(e) => detailViewItem(item)}>{item.item_name}</strike>
      )}
      <span>
        <button
          className="btn btn-info mr-2 btn-sm"
          onClick={(e) => setEditItemState(item)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger mr-2 btn-sm"
          onClick={(e) => deleteItem(item)}
        >
          Delete
        </button>
      </span>
    </li>
  );
};

export default Item;
