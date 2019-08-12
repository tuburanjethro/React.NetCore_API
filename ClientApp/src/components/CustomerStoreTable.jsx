import React from 'react';
import EditModal from './EditModal.jsx';
import DeleteModal from './DeleteModal.jsx';
import CreateCustomerModal from './CreateCustomerModal.jsx';

import {
     Table
    } from 'semantic-ui-react';

export default class CustomerStoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            customer: { Id: 5, Name: "John", Address: "Smith" },
            displayName: this.props.displayName
        };
        this.loadData = this.loadData.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.loadData();
        alert("Mounted");
    }

    loadData = () => {
        let url = 'api/'+this.state.displayName
        fetch(url)
        .then(response => response.json())
        .then(customers => {
            this.setState({ customerList: customers});
        });
        alert("loadData");
    }

    create = (obj) => {
        fetch('api/Customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
        alert("Create");
        this.loadData();
    }

    edit = (obj) => {
        let url = 'api/Customer/' + obj.Id
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
        alert("Edit");
        this.loadData();
    }

    delete = (obj) => {
        let url = "api/customer/" + obj.id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
        alert("Delete");
        this.loadData();
    }

    render() {

        let serviceList = this.state.customerList;

        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service => 
                <Table.Row key={service.id}>
                    <Table.Cell>{service.name}</Table.Cell>
                    <Table.Cell>{service.address}</Table.Cell>
                    <Table.Cell>
                        <EditModal
                            displayName={this.state.displayName} 
                            id={service.id} 
                            name={service.name} 
                            address={service.address}
                            edit={this.edit}
                            />
                        {/* <Button onClick={this.update}></Button> */}
                    </Table.Cell>
                    <Table.Cell>
                        <DeleteModal
                            displayName={this.state.displayName} 
                            customer = {{Id: service.id,
                                        Name: service.name,
                                        Address: service.address}} 
                            deleteCustomer = {this.delete}/>
                    </Table.Cell>
                </Table.Row>
            )
        }
        return (
            <React.Fragment>
                <CreateCustomerModal action={this.create}/>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
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
