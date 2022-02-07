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
                name="item_name"
                id="item-name"
                onChange={this.props.handleFieldChange}
                value={this.state.activeItem.item_name}
                placeholder="Enter Item Name"
              />
            </FormGroup>
            {/* Description label */}
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="item_description"
                id="description"
                value={this.state.activeItem.item_description}
                onChange={this.props.handleFieldChange}
                placeholder="Describe the item"
              />
            </FormGroup>

            {/* item link label */}
            <FormGroup>
              <Label for="item-link">Link</Label>
              <Input
                id="item-link"
                type="url"
                name="item_link"
                value={this.state.activeItem.item_link}
                onChange={this.props.handleFieldChange}
                placeholder="Enter a link to the item"
              />
            </FormGroup>
            {/* item image label */}
            <FormGroup>
              <Label for="item-image">Image</Label>
              <Input
                id="item-image"
                type="file"
                name="item_image"
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
                  onChange={this.props.handleFieldChange}
                />
                Claimed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={onSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ItemModal;
