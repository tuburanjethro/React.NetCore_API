import React from "react";
import CustomerStoreTable from "./CustomerStoreTable";
import Login from "./Login.jsx";
import {
  Menu
} from "semantic-ui-react";


export class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: "Customer"
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.getComponent = this.getComponent.bind(this);
  }

  handleItemClick = (e, { name }) =>{
    this.setState({
      activeItem: name
    });
    this.getComponent();
  }

  shouldComponentUpdate(){

  }

  // handleItemClick = (active) =>{
  //   let component = this.getComponent();
  //   this.setState({
  //     activeItem: active
  //   })
  // }
  getComponent = () => {
    let component;
    switch (this.state.activeItem){
        case 'Customer' :
            component = <CustomerStoreTable displayName={this.state.activeItem}/>;
            break;
        case 'Product' :
            component = <Login/>;
            break;
        case 'Store' :
            component = <CustomerStoreTable displayName={this.state.activeItem}/>;
            break;
        case 'Sale' :
            component = <Login/>;
            break;
        default:
            component = <CustomerStoreTable/>
            break;
    }
    return component;
  }

  render(){
      const { activeItem } = this.state;
      
      return(
        <React.Fragment>
          <div>
            <Menu>
              <Menu.Item header>React</Menu.Item>
              <Menu.Item
                name='Customer'
                active={activeItem === 'Customer'}
                onClick={this.handleItemClick}
              />
              <Menu.Item 
                name='Product' 
                active={activeItem === 'Product'} 
                onClick={this.handleItemClick} 
              />
              <Menu.Item
                name='Store'
                active={activeItem === 'Store'}
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
