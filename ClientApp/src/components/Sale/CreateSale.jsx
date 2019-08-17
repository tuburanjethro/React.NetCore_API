import React from 'react';
import {
    Table, Form, Dropdown, Button, Input, Select, Modal, Label, Header
} from 'semantic-ui-react';

export default class CreateSale extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            customerList: [],
            productList: [],
            storeList: [],
            customer: 0,
            product: 0,
            store: 0,
            date: ''
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getData = this.getData.bind(this);
        this.convert = this.convert.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })

    convert = (date) => {
        let arr = date.split("/");
        return arr[1]+"/"+arr[0]+"/"+arr[2];
    }

    handleSave = () => {
        let date = this.convert(this.state.date);
        this.props.action({
            ProductId: this.state.product,
            CustomerId: this.state.customer,
            StoreId: this.state.store,
            DateSold: date
        });

        console.log(this.state.date)

        this.handleClose();
    }

    getData = () => {
        Promise.all([
            fetch('api/Customers'),
            fetch('api/Products'),
            fetch('api/Stores')
        ])
        .then(([res1, res2, res3]) => {
            return Promise.all([
                res1.json(),
                res2.json(),
                res3.json()
            ])
        })
        .then(([res1, res2, res3]) => {
            this.setState({
                customerList: res1, 
                productList: res2,
                storeList: res3
            })
        });
    }

    render(){
        let customerList = this.state.customerList;
        let productList = this.state.productList;
        let storeList = this.state.storeList;

        let customers = [];
        let products = [];
        let stores = []; 

        customerList.map(customer => {
            customers.push({key: customer.id, text: customer.name, value: customer.id});
        });
        productList.map(product => {
            products.push({key: product.id, text: product.name, value: product.id});
        })
        storeList.map(store => {
            stores.push({key: store.id, text: store.name, value: store.id});
        })
        
        
        return(
            <Modal
                trigger={<Button primary onClick={this.handleOpen}>Create Sale</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
            <Modal.Header>
                Create Sale
            </Modal.Header>
            <Modal.Content>
                Date Sold (MM/DD/YYYY)
                <Input
                    fluid
                    onChange={(e) => this.setState({ date: e.target.value })}
                    />
                Customers
                <Dropdown
                    fluid
                    search
                    selection
                    options={customers}
                    onChange={(e, data) => this.setState({customer: data.value})}
                    />
                Products
                <Dropdown
                    fluid
                    search
                    selection
                    options={products}
                    onChange={(e, data) => this.setState({product: data.value})}
                    />
                Stores
                <Dropdown
                    fluid
                    search
                    selection
                    options={stores}
                    onChange={(e, data) => this.setState({store: data.value})}
                    />
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
        )
    }
}

/*
<Modal.Content>
    <Form>
        <Form.Field
            control={Select}
            options={customers}
            label="Customer"
            search
            searchInput={{ id: 'form-select-control-customer' }}
            onChange={(e) => this.setState({customer: e.target.value})}
        />
        <Form.Field
            control={Select}
            options={products}
            label="Product"
            search
            searchInput={{ id: 'form-select-control-product' }}
            onChange={(e) => this.setState({product: e.target.value})}
        />
        <Form.Field
            control={Select}
            options={stores}
            label="Store"
            search
            searchInput={{ id: 'form-select-control-store' }}
            onChange={(e) => this.setState({store: e.target.value})}
        />
    </Form>
</Modal.Content>
*/

/*
<Modal.Content>
    Customers
    <Dropdown
        fluid
        search
        selection
        options={customers}
        />
    Products
    <Dropdown
        fluid
        search
        selection
        options={products}
        />
    Stores
    <Dropdown
        fluid
        search
        selection
        options={stores}
        />
</Modal.Content>
<Modal.Actions>
    <Button onClick={this.handleClose}>
        Cancel
    </Button>
    <Button onClick={this.handleSave}>
        Save
    </Button>
</Modal.Actions>
*/