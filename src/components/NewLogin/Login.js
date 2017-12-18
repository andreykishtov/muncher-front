import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'antd/lib/form/style/css';
import 'antd/lib/checkbox/style/css';

const LoginWrapper = styled.div`
max-width: 500px;
margin: 5em auto;

.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
.ant-row {
  padding: 0 0 0 0 ;
}
`;

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginWrapper>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="signup">register now!</a>
          </FormItem>
        </Form>
      </LoginWrapper >
    );
  }
}
LoginForm.propTypes = {

  form: PropTypes.arrayOf(PropTypes.shape({
    getFieldDecorator: PropTypes.arrayOf(PropTypes.shape({
      userName: PropTypes.string,
      password: PropTypes.string,
      remember: PropTypes.bool
    }).isRequired),
    validateFields: PropTypes.func
  }).isRequired).isRequired
};

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
