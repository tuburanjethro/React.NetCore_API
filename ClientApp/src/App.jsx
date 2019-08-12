import React, { Component } from 'react';
import { Layout } from './components/Layout.jsx';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <div>
          <Layout />
        </div>
      </div>
    );
  }
}