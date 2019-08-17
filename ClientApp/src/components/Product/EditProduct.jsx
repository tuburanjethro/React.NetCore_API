import React from 'react';
import {
    Button, Modal, Form, Header, Icon
} from 'semantic-ui-react';

export default class EditProduct extends React.Component {

    constructor(props){
      super(props);
      this.state = { 
        modalOpen: false,
        Id: this.props.Id,
        Name: this.props.Name,
        Price: this.props.Price
      }
      
      this.handleClose = this.handleClose.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
    }

    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })

    saveChanges(){
      this.props.edit({Id: this.state.Id, Name: this.state.Name, Price: this.state.Price});
      this.handleClose();
    }
  
    render() {
      const displayName = this.props.displayName;
      return (
        <Modal
          trigger={<Button color="yellow" onClick={this.handleOpen}><Icon name="edit" />Edit</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Header content={"Edit "+displayName} />
          <Modal.Content>
            <Form>
                <Form.Input
                    fluid
                    label="Name"
                    placeholder={this.props.Name}
                    onChange={(e) => this.setState({Name: e.target.value})}
                ></Form.Input>
                <Form.Input
                    fluid
                    label="Price"
                    placeholder={this.props.Price}
                    onChange={(e) => this.setState({Price: e.target.value})}
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