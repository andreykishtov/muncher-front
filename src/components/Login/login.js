import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginRequest } from '../../actions/user.js'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value })
    }
    handleLoginRequest() {
        const { dispatch } = this.props;
        const { username, password } = this.state;
        if (username && password) {
            dispatch(loginRequest(username, password))
        }
    }
    render() {
        return (
            <div style={{ margin: '3em' }}>
                <TextField
                    name='username'
                    hintText="Username"
                    onChange={this.handleInputChange}
                /><br />
                <TextField
                    name='password'
                    hintText="Password"
                    onChange={this.handleInputChange}
                    type='password'
                /><br />
                <RaisedButton primary onClick={this.handleLoginRequest} label="Login" />
            </div>
        );
    }
}

export default connect()(LoginForm)