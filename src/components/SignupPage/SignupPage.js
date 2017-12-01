import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReusableForm from '../ReusableForm/ReusableForm';
import { loginSignupRequest } from '../../redux/actions/user';
import messages from '../../helpers/messages';
import { Form, SubTitle } from './SignupPage.styles';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
      },
      errors: {
        usernameError: '',
        passwordError: '',
        firstnameError: '',
        lastnameError: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target }) {
    const { inputs, errors } = this.state;
    this.setState({
      inputs: { ...inputs, [target.name]: target.value },
      errors: { ...errors, [`${target.name}Error`]: '' }
    });
  }

  handleSubmit() {
    const { dispatch } = this.props;
    const { username, password, firstname, lastname } = this.state.inputs;
    if (username && password && firstname && lastname) {
      dispatch(loginSignupRequest('signup', { username, password }));
    } else {
      const { inputs } = this.state;
      const failedInputs = {};
      Object.keys(inputs).forEach(key => {
        failedInputs[`${key}Error`] = !inputs[key].length
          ? messages.requiredField
          : '';
      });
      this.setState({ errors: failedInputs });
    }
  }

  render() {
    const fields = [
      { name: 'username', type: 'text', placeHolder: 'Username' },
      { name: 'password', type: 'password', placeHolder: 'Password' },
      { name: 'firstname', type: 'text', placeHolder: 'First Name' },
      { name: 'lastname', type: 'text', placeHolder: 'Last Name' }
    ];
    return (
      <Form>
        <SubTitle>Please fill out the form</SubTitle>
        <ReusableForm
          fields={fields}
          errors={this.state.errors}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          submitLabel="Signup"
        />
      </Form>
    );
  }
}

SignupPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(SignupPage);
