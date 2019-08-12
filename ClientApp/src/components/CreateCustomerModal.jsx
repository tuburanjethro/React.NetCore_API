import React from 'react';
import {
    Modal, Button, Form, Header
} from 'semantic-ui-react';

export default class CreateCustomerModal extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            modalOpen: false,
            customer: { Id: 0, Name: "", Address: "" },
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
    }

    render(){
        return(
            <Modal
                trigger={<Button primary onClick={this.handleOpen}>Create Customer</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                >
                
                <Header content="Create Customer" />
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
                    <Button onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button textAlign="right" onClick={this.handleSave}>
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
                
        );
    }
}