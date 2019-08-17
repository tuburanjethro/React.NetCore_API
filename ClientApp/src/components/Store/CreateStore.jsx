import React from 'react';
import {
    Modal, Button, Form, Header
} from 'semantic-ui-react';

export default class CreateStore extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            modalOpen: false,
            name: "",
            address: ""
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    
    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })

    handleSave(){
        this.props.action({Id: 5, Name: this.state.name, Address: this.state.address});
        this.handleClose();
    }

    render(){
        return(
            <Modal
                trigger={<Button primary onClick={this.handleOpen}>Create Store</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                >
                
                <Header content="Create Store" />
                <Modal.Content>
                    <Form size="large">
                        <Form.Input
                            fluid
                            onChange={(e) => this.setState({name: e.target.value})}
                            label="Name"
                        />
                        <Form.Input
                            fluid
                            onChange={(e) => this.setState({address: e.target.value})}
                            label="Address"
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button color="green" onClick={this.handleSave}>
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
                
        );
    }
}