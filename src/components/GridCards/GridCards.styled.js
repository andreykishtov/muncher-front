import styled from 'styled-components';

export const Grid = styled.div`
  width: 100%;
  grid-area: ${props => props.gridArea};
  display: grid;
  grid-template-columns: repeat(${props => props.gridColumns}, 1fr);
  grid-gap: 15px 15px;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #ddd;
`;

export const CardsContainer = styled.div``;

export const CardsPagination = styled.div`
  display: flex;
  flex-direction: column;
`;
