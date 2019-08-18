import React from 'react';
import {
    Button, Modal, Header, Icon
} from 'semantic-ui-react';

export default class DeleteSale extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      displayName: this.props.displayName
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  delete = () => {
    this.props.delete(this.props.sale);
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
          <Button color="black" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button color="red" onClick={this.delete}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}