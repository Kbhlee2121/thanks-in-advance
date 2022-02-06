import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  //checks if checkbox is checked or not
  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  //toggle for if the modal is on or off
  render() {
    // toggle and save the changes which or from this.prop
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Item</ModalHeader>
        <ModalBody>
          <Form>
            {/* wishlist label? */}
            {/* Item name */}
            <FormGroup>
              <Label for="item-name">Item Name</Label>
              <Input
                // type="text"
                name="item-name"
                value={this.state.activeItem.item_name}
                onChange={this.handleChange}
                placeholder="Enter Item Name"
              />
            </FormGroup>
            {/* Description label */}
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                value={this.state.activeItem.item_description}
                onChange={this.handleChange}
                placeholder="Describe the item"
              />
            </FormGroup>

            {/* item link label */}
            <FormGroup>
              <Label for="item-link">Link</Label>
              <Input
                type="url"
                name="item-link"
                value={this.state.activeItem.item_link}
                onChange={this.handleChange}
                placeholder="Enter a link to the item"
              />
            </FormGroup>
            {/* item image label */}
            <FormGroup>
              <Label for="item-image">Image</Label>
              <Input
                type="file"
                name="item-image"
                value={this.state.activeItem.item_image}
                onChange={this.onImageChange}
              />
            </FormGroup>
            {/* claimed label */}
            <FormGroup check>
              <Label for="claimed">
                <Input
                  type="checkbox"
                  name="claimed"
                  checked={this.state.activeItem.claimed}
                  onChange={this.handleChange}
                />
                Claimed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ItemModal;
