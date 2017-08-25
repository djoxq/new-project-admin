import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ProductForm from './components/ProductForm';

ReactDOM.render(
    <Router history={ browserHistory } >
        <Route path='/product' component={ ProductForm } />
        <Route path='/' component={ App } />
        <Redirect from="*" to="/"/>
    </Router>, document.getElementById('root')
);
registerServiceWorker();
