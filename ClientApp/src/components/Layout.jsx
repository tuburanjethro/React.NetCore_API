import React from "react";
import CustomerTable from "./Customer/CustomerTable.jsx";
import SalesTable from "./Sale/SalesTable.jsx";
import ProductTable from "./Product/ProductTable.jsx";
import StoreTable from './Store/StoreTable.jsx';

import {
  Menu
} from "semantic-ui-react";


export class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: "Customers"
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.getComponent = this.getComponent.bind(this);
  }

  handleItemClick = (e, { name }) =>{
    console.log("Layout handleClick: "+this.state.activeItem+" => "+ name);
    this.setState({
      activeItem: name
    });
  }

  getComponent = () => {
    console.log("Layout: getComponent");
    let component;
    switch (this.state.activeItem){
        case 'Customers' :
            component = <CustomerTable/>;
            break;
        case 'Products' :
            component = <ProductTable />;
            break;
        case 'Stores' :
            component = <StoreTable/>;
            break;
        case 'Sales' :
            component = <SalesTable/>;
            break;
        default:
            component = <CustomerTable/>
            break;
    }
    return component;
  }

  render(){
    console.log("Layout: Rendering...");

    const { activeItem } = this.state;
    
    return(
      <React.Fragment>
        <div>
          <Menu inverted>
            <Menu.Item header>React</Menu.Item>
            <Menu.Item
              name='Customers'
              active={activeItem === 'Customers'}
              onClick={this.handleItemClick}
            />
            <Menu.Item 
              name='Products' 
              active={activeItem === 'Products'} 
              onClick={this.handleItemClick} 
            />
            <Menu.Item
              name='Stores'
              active={activeItem === 'Stores'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Sales'
              active={activeItem === 'Sales'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </div>
        <div>
            {this.getComponent()}
        </div>
      </React.Fragment>       
    );
  }
}
