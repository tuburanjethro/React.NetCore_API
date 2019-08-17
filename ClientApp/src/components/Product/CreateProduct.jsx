import React from 'react';
import {
    Modal, Button, Form, Header
} from 'semantic-ui-react';

export default class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            name: '',
            price: 0.00
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }


    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleSave() {
        this.props.action({ Id: 5, Name: this.state.name, Price: this.state.price });
        this.handleClose();
    }

    render() {
        return (
            <Modal
                trigger={<Button primary onClick={this.handleOpen}>Create {this.props.displayName}</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >

                <Header content={"Create " + this.props.displayName} />
                <Modal.Content>
                    <Form size="large">
                        <Form.Input
                            fluid
                            onChange={(e) => this.setState({ name: e.target.value })}
                            label="Name"
                        />
                        <Form.Input
                            fluid
                            onChange={(e) => this.setState({ price: e.target.value })}
                            label="Price"
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

