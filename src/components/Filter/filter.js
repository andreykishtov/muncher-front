/* eslint no-console: "off" */

import 'antd/lib/select/style/css';
import 'antd/lib/button/style/css';

import { Button, Select } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import geolib from 'geolib';
import { FilterStyle, ButtonItem, DistanceItem } from './filter.styled';

const { Option } = Select;
const KM = 1000;

const initDistances = farthestDistance => {
  const MENU_ITEMS = 9;
  const START_FROM = 1;
  const section = farthestDistance / MENU_ITEMS;
  return Array(MENU_ITEMS)
    .fill(1)
    .map((item, index) => {
      const value = parseInt(section * (index + START_FROM), 10).toString();
      return (
        <Option key={value} value={value}>
          {value}
        </Option>
      );
    });
};

class Filter extends Component {
  state = {
    orderType: undefined,
    city: undefined,
    initialDistance: undefined,
    distance: undefined,
    menuDistances: [],
    myPosition: {
      latitude: -1,
      longitude: -1
    }
  };

  componentDidMount() {
    this.getMyLocation();
  }

  getMyLocation() {
    navigator.geolocation.getCurrentPosition(
      myPosition1 => {
        const { latitude, longitude } = myPosition1.coords;
        const myPosition = { latitude, longitude };
        this.checkFarthestPoint(myPosition);
        this.setState({ myPosition });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );
  }

  initCities() {
    const { cards } = this.props;
    const cities = cards.map(card => card.city);
    const cordsNoDup = cities.filter((city, pos) => cities.indexOf(city) === pos);
    return cordsNoDup.map(city => (
      <Option key={city} value={city}>
        {city}
      </Option>
    ));
  }

  checkFarthestPoint(myPosition) {
    let dist;
    let initialDistance =
      this.props.cards.reduce((maxDist, card) => {
        dist = geolib.getDistance(myPosition, { latitude: card.lng, longitude: card.lat });
        return Math.max(dist, maxDist);
      }, 0) / KM;
    initialDistance += 1;
    initialDistance = parseInt(initialDistance, 10);
    this.setState({ initialDistance, menuDistances: initDistances(initialDistance) });
  }

  filterAll = () => {
    const { city, myPosition, distance, orderType } = this.state;
    const { cards } = this.props;
    const filteredList = cards.filter(card => {
      const cityFlag = city ? card.city.toLowerCase().includes(city.toLowerCase()) : 1;
      const orderTypeFlag = orderType ? card.orderType.find(type => type === orderType) : 1;
      const geoDistance = geolib.getDistance(myPosition, {
        latitude: card.lng,
        longitude: card.lat
      });
      const distanceFlag = distance ? geoDistance / KM < distance : 1;
      return distanceFlag && cityFlag && orderTypeFlag;
    });

    this.props.updateFilterCards(filteredList);
    this.props.updatePaginationCards(filteredList);
  };

  clearFilter = () => {
    const { cards } = this.props;
    this.setState({ orderType: undefined, city: undefined, distance: undefined });
    this.props.updateFilterCards(cards);
    this.props.updatePaginationCards(cards);
  };

  render() {
    const { orderType, city, distance, initialDistance, menuDistances } = this.state;
    return (
      <FilterStyle>
        <Select
          showSearch
          size="large"
          style={{ width: 200 }}
          placeholder="Select order type"
          optionFilterProp="children"
          value={orderType}
          onChange={value => {
            this.setState({ orderType: value });
          }}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="takeOut">takeOut</Option>
          <Option value="sit">sit</Option>
        </Select>

        <Select
          showSearch
          size="large"
          style={{ width: 200 }}
          placeholder="Select city"
          optionFilterProp="children"
          value={city}
          onChange={value => {
            this.setState({ city: value });
          }}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {this.initCities()}
        </Select>

        <Select
          showSearch
          size="large"
          style={{ width: 200 }}
          placeholder="Select distance"
          optionFilterProp="children"
          value={distance}
          onChange={value => {
            this.setState({ distance: value, initialDistance: value });
          }}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {menuDistances}
        </Select>
        <DistanceItem>{initialDistance || 0} KM</DistanceItem>

        <Button type="primary" size="large" style={ButtonItem} onClick={this.clearFilter}>
          Clear
        </Button>
        <Button type="primary" size="large" style={ButtonItem} onClick={this.filterAll}>
          Filter
        </Button>
      </FilterStyle>
    );
  }
}

Filter.propTypes = {
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
  updateFilterCards: PropTypes.func.isRequired,
  updatePaginationCards: PropTypes.func.isRequired
};

export default Filter;
