import 'antd/lib/card/style/css';
import 'antd/lib/pagination/style/css';
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Pagination } from 'antd';
import { CardsContainer, CardsPagination } from './GridCards.styled';

const GridCards = ({ pageSize, filteredCards, paginationSection, pageNum, updatePagination }) => (
  <Card
    id="cardWrapper"
    style={{
      scrollBehavior: 'smooth',
      height: 'calc(100vh - 112px)',
      overflowY: 'scroll'
    }}
    bordered={false}
    noHovering
  >
    <CardsPagination>
      <CardsContainer>{paginationSection}</CardsContainer>
      <Pagination
        defaultCurrent={1}
        current={pageNum}
        pageSize={pageSize}
        total={filteredCards.length}
        onChange={updatePagination}
      />
    </CardsPagination>
  </Card>
);

GridCards.propTypes = {
  pageNum: PropTypes.number,
  updatePagination: PropTypes.func,
  // paginationData: PropTypes.arrayOf(PropTypes.shape({}))
  pageSize: PropTypes.number,
  filteredCards: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.string,
    city: PropTypes.string,
    orderType: PropTypes.arrayOf(PropTypes.string),
    lng: PropTypes.number,
    lat: PropTypes.number
  })).isRequired
};

GridCards.defaultProps = {
  pageSize: () => null,
  pageNum: () => 1,
  updatePagination: () => null
};

export default GridCards;
