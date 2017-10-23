import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginForm from '../components/LoginForm/loginForm';
import { toggleLoginDialog } from '../actions/user';
import { messages } from '../helpers/messages';

// looks like we have import with the same name on line 8
const LoginDialog = ({ toggleLoginDialog }) => {
  const actions = [
    <Link to="/signup">
      <FlatButton
        label="Not registered? Register now!"
        primary
        onClick={toggleLoginDialog}
      />
    </Link>,
    <FlatButton label="Cancel" secondary onClick={toggleLoginDialog} />
  ];

  return (
    <div>
      <RaisedButton label="Login" onClick={toggleLoginDialog} />
      <Dialog
        title={messages.loginDialogTitle}
        actions={actions}
        modal={false}
        open={this.props.loginDialogOpen}
        onRequestClose={toggleLoginDialog}
      >
        <LoginForm />
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  const { loginDialogOpen } = user;
  return {
    loginDialogOpen
  };
};

const mapDispatchToProps = dispatch => ({
  toggleLoginDialog: () => {
    dispatch(toggleLoginDialog());
  }
});

LoginDialog.propTypes = {
  toggleLoginDialog: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
