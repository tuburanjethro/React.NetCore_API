import React from 'react';
import {
    Button, Modal, Form, Header, Icon
} from 'semantic-ui-react';

export default class EditCustomer extends React.Component {

    constructor(props){
      super(props);
      this.state = { 
        modalOpen: false,
        Name: this.props.name,
        Address: this.props.address,
      }
      
      this.handleClose = this.handleClose.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
    }

    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })

    saveChanges(){
      this.props.edit({Id: this.props.id, Name: this.state.Name, Address: this.state.Address});
      this.handleClose();
    }
  
    render() {
      return (
        <Modal
          trigger={<Button color="yellow"onClick={this.handleOpen}><Icon name="edit" />Edit</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Header content="Edit Customer"/>
          <Modal.Content>
            <Form>
                <Form.Input
                    fluid
                    label="Name"
                    placeholder={this.props.name}
                    onChange={(e) => this.setState({Name: e.target.value})}
                ></Form.Input>
                <Form.Input
                    fluid
                    label="Address"
                    placeholder={this.props.address}
                    onChange={(e) => this.setState({Address: e.target.value})}
                ></Form.Input> 
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="green" onClick={this.saveChanges}>
                Edit
            </Button>
          </Modal.Actions>
        </Modal>
      )
    }
}