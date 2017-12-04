import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as authActions from '../../store/auth/actions';
import * as exceptionsSelectors from '../../store/exceptions/selectors';
import * as exceptionsActions from '../../store/exceptions/actions';

class LoginPage extends Component {
    state = {
        form : {
            email : '',
            password : '',
        }
    };

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillUnmount() {
        this.props.clearExceptions();
    }

    hasError(inputName) {
        return !!this.props.exceptions[inputName];
    }

    getErrorClass(inputName, defaultClasses = '') {
        return this.hasError(inputName) ? defaultClasses + ' has-error' : defaultClasses;
    }

    getErrorMessage(inputName) {
        return this.props.exceptions[inputName];
    }

    handleInputChange(e) {
        let form = _.extend({}, this.state.form);
        form[e.target.name] = e.target.value;
        this.setState({form});
    }

    handleSubmitClick(e) {
        e.preventDefault();
        this.props.login(this.state.form);
    }

    render () {
        let emailLabel = this.hasError('email') ? `Email ${this.getErrorMessage('email')}` : 'Email';
        let passwordLabel = this.hasError('password') ? `Password ${this.getErrorMessage('password')}` : 'Password';

        let alert = null;
        if (this.props.exceptions['invalid_credentials']) {
            alert = (
                <div className="alert alert-danger">
                    { this.props.exceptions['invalid_credentials'] }
                </div>
            );
        }

        return (
            <div className="LoginPage row">
                <div className="wrapper col-sm-6 col-sm-offset-3">
                    <br/><br/>
                    <h2>Login</h2>
                    <br/>
                    { alert }
                    <form>
                        <div className={ this.getErrorClass('email', 'form-group') } >
                            <label className="control-label" htmlFor="email">{ emailLabel }</label>
                            <input className="form-control" type="text" id="email" name="email" value={ this.state.form.email } onChange={ this.handleInputChange }/>
                        </div>
                        <div className={ this.getErrorClass('password', 'form-group') } >
                            <label className="control-label" htmlFor="password">{ passwordLabel }</label>
                            <input className="form-control" type="password" id="password" name="password" onChange={ this.handleInputChange }/>
                        </div>
                        <button className="btn btn-primary" type="submit" onClick={ this.handleSubmitClick }>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        exceptions: exceptionsSelectors.getItems(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (data) => {
            dispatch(authActions.login(data))
        },
        clearExceptions: () => {
            dispatch(exceptionsActions.clear())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);