import styled from 'styled-components';

export const HeaderStyle = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .ant-btn {
    margin: 0 0.2rem;
  }
  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const Title = styled.h1`
  color: #cb0067;
  margin-top: 7px;
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
