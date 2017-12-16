import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';

const LoginWrapper = styled.div`
max-width: 500px;
margin: auto;
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
.ant-row {
  padding: 10px 0 0 0 ;
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
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </LoginWrapper >
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
