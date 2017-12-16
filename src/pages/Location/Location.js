import React from 'react';
import styled from 'styled-components';
// import Menu from '../../components/Menu/Menu';
import LocationAction from '../../components/LocationAction/LocationAction';
import ImageShow from '../../components/ImageShow/ImageShow';
import ReviewList from '../../components/Reviews/ReviewList';
import images from './images';
import reviews from './reviews';
import MapWithMarkers from '../../components/Maps/MapWithMarkers';
import data from '../HomePage/data';

const LocationWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  padding: 1rem;
`;
const ReviewsWrapper = styled.div`
  height: 55vh;
  overflow-y: hidden;
  border: 1px solid #eee;
  padding: 0 20px 0 20px;
  &:hover {
    overflow-y: scroll;
  }
`;

const location = () => {
  const currentLocationId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  const locateLocationById = element => currentLocationId === element.id;
  const myLocation = [data.cards.find(locateLocationById)];

  return (
    <div>
      <LocationWrapper>
        <ImageShow data={images} />
        <LocationAction />
        {/* <Menu grid="2fr" /> */}
        <MapWithMarkers dataMarkers={myLocation} lat={myLocation[0].lat} lng={myLocation[0].lng} defaultZoom={7} />
        <ReviewsWrapper>
          <ReviewList data={reviews} />
        </ReviewsWrapper>
      </LocationWrapper>
    </div>
  );
};

export default location;
