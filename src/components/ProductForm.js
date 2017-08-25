import React, { Component } from 'react';
import autoBind from 'react-autobind';
// eslint-disable-next-line
import { browserHistory } from 'react-router';
// eslint-disable-next-line
import _ from 'lodash';

class ProductForm extends Component {

    constructor(props){
        super(props);
        autoBind(this);
    }

    render () {
        return (
            <div className="hey">
                <h1>Hello world</h1>
            </div>
        );
    }
}

export default ProductForm;