import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/flat-51-128.png';
import { HeaderStyle, Title, Nav, NavItem } from './Header.styles';

const Header = () => (
  <HeaderStyle>
    <Nav>
      <NavItem>
        <img src={logo} style={{ width: '50px' }} alt="logo" />
      </NavItem>
      <NavItem>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title>Muncher</Title>
        </Link>
      </NavItem>
    </Nav>
    <Nav>
      <Link to="login">
        <Button type="default" size="large">
          login
        </Button>
      </Link>
      <Link to="dashboard">
        <Button type="default" size="large">
          owner zone
        </Button>
      </Link>
      <a href="https://github.com/Alaev/muncher-front">
        <Button type="default" size="large" >
          <i
            className="fa fa-github"
            aria-hidden="true"
            style={{ color: 'black' }}
          />   Github
        </Button>
      </a>
    </Nav>
  </HeaderStyle>
);

export default Header;
