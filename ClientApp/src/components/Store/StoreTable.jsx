import React from 'react';

import {
    Table, 
} from 'semantic-ui-react';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';
import CreateStore from './CreateStore';

export default class StoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            store: { Id: 0, Name: "", Address: "" },
            displayName: "Stores"
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
        .then(store => {
            this.setState({ storeList: store});
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
        let storeList = this.state.storeList;

        let tableData = <p><em>Loading...</em></p>;

        if (storeList !== "") {
            tableData = storeList.map(store => 
                <Table.Row key={store.id}>
                    <Table.Cell>{store.name}</Table.Cell>
                    <Table.Cell>{store.address}</Table.Cell>
                    <Table.Cell>
                        <EditStore
                            id={store.id} 
                            name={store.name} 
                            address={store.address}
                            edit={this.edit}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <DeleteStore
                            displayName={this.state.displayName} 
                            id={store.id} 
                            name={store.name} 
                            address={store.address} 
                            delete = {this.delete}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                <CreateStore action={this.create} displayName={this.state.displayName} />
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