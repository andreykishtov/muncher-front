import styled from 'styled-components';

export const HeaderStyle = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Title = styled.h1`
  color: #cb0067;
  margin-top: 5px;
  margin-bottom: 0;
`;

export const NavItem = styled.li`
  padding: 0 1em;
`;

export const Nav = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 1025px) {
    flex-direction: row;
  }
`;
