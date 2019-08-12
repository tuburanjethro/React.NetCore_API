import React from 'react';
import {
    Button, Modal, Header, Icon
} from 'semantic-ui-react';

export default class DeleteModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      displayName: this.props.displayName
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  deleteCustomer = () => {
    this.props.deleteCustomer(this.props.customer);
    this.handleClose();
  }

  render() {
    return (
      <Modal
      trigger={<Button negative onClick={this.handleOpen}><Icon name="delete" />Delete</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header>
          Delete {this.state.displayName}
        </Header>
        <Modal.Content>
          Are you sure?
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.handleClose}>
            Cancel
          </Button>
          <Button textAlign="right" color="red" onClick={this.deleteCustomer}>
              Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}