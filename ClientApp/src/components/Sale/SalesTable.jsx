import React from 'react';
import {
    Table
} from 'semantic-ui-react';
import EditSale from './EditSale';
import DeleteSale from './DeleteSale';
import CreateSale from './CreateSale';

export default class SalesTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            salesList: [],
            displayName: "Sales"
        };

        this.loadData = this.loadData.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = () => {
        let url = 'api/'+this.state.displayName;
        fetch(url)
        .then(response => response.json())
        .then(sales => {
            this.setState({ salesList: sales});
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
                ProductId: obj.ProductId,
                CustomerId: obj.CustomerId,
                StoreId: obj.StoreId,
                DateSold: obj.DateSold
            })
        }).then(this.loadData());
    }

    edit = (obj) => {
        let url = 'api/'+this.state.displayName+'/' + obj.Id
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).then(this.loadData());
    }

    delete = (obj) => {
        let url = "api/"+this.state.displayName+"/" + obj.id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).then(this.loadData());
    }

    convert = (date) => {
        let arr = date.slice(0,10).split("-");
        return arr[2]+"/"+arr[1]+"/"+arr[0];
    }

    render(){
        let salesList = this.state.salesList;

        let tableData = <p><em>Loading...</em></p>;

        if(salesList != ""){
            tableData = salesList.map(sale =>
                <Table.Row key={sale.id}>
                    <Table.Cell>{sale.customer.name}</Table.Cell>
                    <Table.Cell>{sale.product.name}</Table.Cell>
                    <Table.Cell>{sale.store.name}</Table.Cell>
                    <Table.Cell>{this.convert(sale.dateSold)}</Table.Cell>
                    <Table.Cell>
                        <EditSale
                            edit={this.edit}
                            sale={sale}
                            dateSold={this.convert(sale.dateSold)}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <DeleteSale 
                            delete={this.delete}
                            sale={sale}
                            />
                    </Table.Cell>
                </Table.Row>
            );
        }

        return (
            <React.Fragment>
                <CreateSale action={this.create}/>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Date Sold (DD/MM/YYYY)</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
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