// import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'

const rootElement = document.getElementById('root');

ReactDOM.render(
    <App />,
  rootElement);

registerServiceWorker();

