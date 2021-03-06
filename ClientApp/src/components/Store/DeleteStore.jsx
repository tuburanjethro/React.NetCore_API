import React from 'react';
import {
    Button, Modal, Header, Icon
} from 'semantic-ui-react';

export default class DeleteStore extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        modalOpen: false,
  }

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  delete = () => {
    this.props.delete({Id: this.props.id, Name: this.state.name, Address: this.state.address});
    this.handleClose();
  }

  render() {
    return (
      <Modal
      trigger={<Button negative onClick={this.handleOpen}><Icon name="delete" />Delete</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header content="Delete Store" />
        <Modal.Content>
          Are you sure?
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.handleClose}>
            Cancel
          </Button>
          <Button textAlign="right" color="red" onClick={this.delete}>
              Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}