import 'antd/lib/tooltip/style/css';
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

import {
  SelectEffect,
  Paragraph,
  ContentWrapper,
  BtnsWrapper,
  CallToActionBtn,
  MapBtn
} from '../LocationCard/LocationCard.styled';

const LocationCard = ({
  id,
  image,
  title,
  text,
  action,
  selected,
  toggleCTADialog,
  redirectToLocation,
  onCardClick
}) => (
  <SelectEffect style={{ background: selected }} selected={selected}>
    <ContentWrapper onClick={() => redirectToLocation(id)}>
      <h3>{title}</h3>
      <img alt={title} width="100%" src={image} />
      <Paragraph>{text}</Paragraph>
    </ContentWrapper>
    <BtnsWrapper>
      <CallToActionBtn onClick={() => toggleCTADialog(id)}>
        <h3>{action}</h3>
      </CallToActionBtn>
      <MapBtn key={id} id={id} onClick={() => onCardClick(id)}>
        <Tooltip title="Show on map">
          <i className="fa fa-map-marker" aria-hidden="true" />
        </Tooltip>
      </MapBtn>
    </BtnsWrapper>
  </SelectEffect>
);

LocationCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.string,
  selected: PropTypes.string,
  toggleCTADialog: PropTypes.func,
  redirectToLocation: PropTypes.func,
  onCardClick: PropTypes.func
};

LocationCard.defaultProps = {
  image: 'https://www.equalserving.com/images/es1scplugin/image-not-available.png',
  title: 'Title unavailable',
  text: 'Text unavailable',
  action: 'Action button',
  selected: null,
  toggleCTADialog: () => null,
  redirectToLocation: () => null,
  onCardClick: () => null
};

export default LocationCard;
