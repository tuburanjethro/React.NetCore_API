import React from 'react';
import DeleteCustomer from './DeleteCustomer.jsx';
import CreateCustomer from './CreateCustomer.jsx';
import EditCustomer from './EditCustomer.jsx';
import {
     Table
    } from 'semantic-ui-react';


export default class CustomerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            customer: { Id: 5, Name: "John", Address: "Smith" },
            displayName: "Customers"
        };
        this.loadData = this.loadData.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let url = 'api/'+this.state.displayName
        fetch(url)
        .then(response => response.json())
        .then(customer => {
            this.setState({ customerList: customer});
        });
    }

    create = (obj) => {
        let url = 'api/'+this.state.displayName
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: obj.Name,
                Address: obj.Address,
            })
        }).then(this.loadData());
    }

    edit = (obj) => {
        let url = 'api/'+this.state.displayName+'/'+ obj.Id
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).then(this.loadData());
        
    }

    delete = (obj) => {
        let url = "api/"+this.state.displayName+"/" + obj.Id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).then(this.loadData());    
    }

    render() {
        let customerList = this.state.customerList;

        let tableData = <p><em>Loading...</em></p>;

        if (customerList !== "") {
            tableData = customerList.map(customer => 
                <Table.Row key={customer.id}>
                    <Table.Cell>{customer.name}</Table.Cell>
                    <Table.Cell>{customer.address}</Table.Cell>
                    <Table.Cell>
                        <EditCustomer
                            id={customer.id} 
                            name={customer.name} 
                            address={customer.address}
                            edit={this.edit}
                            />
                    </Table.Cell>
                    <Table.Cell>
                        <DeleteCustomer
                            displayName={this.state.displayName} 
                            id={customer.id} 
                            name={customer.name} 
                            address={customer.address} 
                            delete = {this.delete}/>
                    </Table.Cell>
                </Table.Row>
            )
        }
        return (
            <React.Fragment>
                <CreateCustomer action={this.create} displayName={this.state.displayName}/>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tableData}
                    </Table.Body>
                </Table>
            </React.Fragment>
        )
    }
}
