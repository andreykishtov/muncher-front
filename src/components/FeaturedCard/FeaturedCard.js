import React from 'react';
import PropTypes from 'prop-types';
import 'antd/lib/card/style/css';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { Icon } from 'react-fa';

import LocationCard from '../LocationCard/LocationCard';

const { TabPane } = Tabs;

const Wrapper = styled.div`
  min-height: 300px;
`;

const FeaturedCard = ({ special, cards, toggleCTADialog, onCardClick }) => (
  <Tabs defaultActiveKey="1" tabPosition="left">
    <TabPane
      tab={
        <span>
          <Icon className="fa-star" /> Special
        </span>
      }
      key="1"
    >
      <Wrapper>
        <LocationCard
          id={special.id}
          key={special.title}
          {...special}
          toggleCTADialog={toggleCTADialog}
          onCardClick={onCardClick}
        />
      </Wrapper>
    </TabPane>
    <TabPane
      tab={
        <span>
          <Icon className="fa-bolt" /> Featured list
        </span>
      }
      key="2"
    >
      <Wrapper>Tab 2</Wrapper>
    </TabPane>
    <TabPane
      tab={
        <span>
          <Icon className="fa-money" /> Fresh on site
        </span>
      }
      key="3"
    >
      <Wrapper>Tab 3</Wrapper>
    </TabPane>
  </Tabs>
);

export default FeaturedCard;

FeaturedCard.propTypes = {
  toggleCTADialog: PropTypes.func,
  onCardClick: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.string,
    city: PropTypes.string,
    orderType: PropTypes.arrayOf(PropTypes.string),
    lng: PropTypes.number,
    lat: PropTypes.number
  })).isRequired,
  special: PropTypes.objectOf({
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.string,
    selected: PropTypes.string,
    toggleCTADialog: PropTypes.func,
    onCardClick: PropTypes.func
  })
};

FeaturedCard.defaultProps = {
  toggleCTADialog: () => null,
  onCardClick: () => null,
  special: {
    image: 'https://www.equalserving.com/images/es1scplugin/image-not-available.png',
    title: 'Title unavailable',
    text: 'Text unavailable',
    action: 'Action button',
    selected: null,
    toggleCTADialog: () => null,
    onCardClick: () => null
  }
};
