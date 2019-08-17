import React from 'react';
import DeleteProduct from './DeleteProduct.jsx';
import CreateProduct from './CreateProduct.jsx';

import {
     Table
    } from 'semantic-ui-react';
import EditProduct from './EditProduct.jsx';

export default class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            product: {},
            displayName: "Products"
        };
        this.loadData = this.loadData.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount(){
        console.log("Product: Mounted");
        this.loadData();
    }

    loadData = () => {
        let url = 'api/'+this.state.displayName
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(product => {
            this.setState({ productList: product});
        });
    }

    create = (obj) => {
        let url = 'api/'+ this.state.displayName
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: obj.Name,
                Price: obj.Price,
            })
        })
        console.log("Create");
        this.loadData();
    }

    edit = (obj) => {
        let url = 'api/'+this.state.displayName+'/' + obj.Id
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).then(r => console.log(r));
        console.log("Edit");
        this.loadData();
    }

    delete = (obj) => {
        let url = 'api/'+this.state.displayName+'/'+obj.Id
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).then(r => console.log(r));
        console.log("Delete");
        this.loadData();
    }

    render() {
        let productList = this.state.productList;

        console.log("Rendering...");
        console.log(this.state.productList);

        let tableData = null;

        if (productList !== "") {
            tableData = productList.map(product => 
                <Table.Row key={product.id}>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell>${product.price}</Table.Cell>
                    <Table.Cell>
                        <EditProduct
                            displayName={this.state.displayName} 
                            Id={product.id}
                            Name={product.name}
                            Price={product.price}
                            edit={this.edit}
                            />
                    </Table.Cell>
                    <Table.Cell>
                        <DeleteProduct
                            displayName={this.state.displayName}
                            Id={product.id}
                            Name={product.name}
                            Price={product.price}
                            delete = {this.delete}/>
                    </Table.Cell>
                </Table.Row>
            )
        }
        return (
            <React.Fragment>
                <CreateProduct action={this.create} displayName={this.state.displayName} />
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
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