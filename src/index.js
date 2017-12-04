import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import LoginPage from './containers/auth/LoginPage'

import ProductForm from './components/ProductForm';

import * as reducers from './store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory } >
            <Route path='/login' component={ LoginPage} />
            <Route path='/product' component={ ProductForm } />
            <Route path='/' component={ App } />
            <Redirect from="*" to="/"/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
