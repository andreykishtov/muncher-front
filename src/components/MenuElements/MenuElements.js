import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import MenuElementChild from '../MenuElementChild/MenuElementChild';

const MenuContent = styled.div`
  margin: 35px 18px;
  font-size: 18px;
`;

const MenuElements = ({ items }) => (
  <MenuContent>
    {items.map(item => <MenuElementChild key={item.id} {...item} />)}
  </MenuContent>
);

MenuElements.propTypes = {
  items: PropTypes.arrayOf(Object)
};

MenuElements.defaultProps = {
  items: [
    { id: 0, name: 'name', price: 'dollar$', description: 'description' }
  ]
};
export default MenuElements;
