import React from 'react';
import {
    Button, Modal, Header, Icon, Input, Dropdown
} from 'semantic-ui-react';

export default class EditSale extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            customerList: [],
            productList: [],
            storeList: [],
            customer: this.props.sale.customerId,
            product: this.props.sale.productId,
            store: this.props.sale.storeId,
            date: this.props.dateSold
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })

    handleSave = () => {
        this.props.edit({
            Id: this.props.sale.id,
            ProductId: this.state.product,
            CustomerId: this.state.customer,
            StoreId: this.state.store,
            DateSold: this.state.date
        });

        console.log(this.state) 

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
                trigger={<Button color="yellow" onClick={this.handleOpen}><Icon name="edit" />Edit</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
            <Modal.Header>
                Edit Sale
            </Modal.Header>
            <Modal.Content>
                Date Sold (DD/MM/YYYY)
                <Input
                    fluid
                    placeholder={this.state.date}
                    onChange={(e) => this.setState({ date: e.target.value })}
                    />
                Customers
                <Dropdown
                    fluid
                    search
                    selection
                    placeholder={this.props.sale.customer.name}
                    options={customers}
                    onChange={(e, data) => this.setState({customer: data.value})}
                    />
                Products
                <Dropdown
                    fluid
                    search
                    selection
                    placeholder={this.props.sale.product.name}
                    options={products}
                    onChange={(e, data) => this.setState({product: data.value})}
                    />
                Stores
                <Dropdown
                    fluid
                    search
                    selection
                    placeholder={this.props.sale.store.name}
                    options={stores}
                    onChange={(e, data) => this.setState({store: data.value})}
                    />
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={this.handleClose}>
                    Cancel
                </Button>
                <Button color="green" onClick={this.handleSave}>
                    Edit
                </Button>
            </Modal.Actions>
            </Modal>
        )
    }
}