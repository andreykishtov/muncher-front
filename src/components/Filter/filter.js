import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import geolib from 'geolib';
import FlatButton from 'material-ui/FlatButton';
import { FilterStyle, SelectItem, ButtonItem } from './filter.styled';
import filterHelper from './filterHelper';

class Filter extends Component {
  constructor(props) {
    super(props);
    const farestDist = this.checkFarestPoint() + 1;
    const menuDistances = filterHelper.initDistances(farestDist);
    this.state = {
      orderType: '',
      title: '',
      city: '',
      distance: farestDist,
      menuDistances
    };

    this.filterOrderType = this.filterOrderType.bind(this);
    this.filterTitle = this.filterTitle.bind(this);
    this.filterCity = this.filterCity.bind(this);
    this.filterDist = this.filterDist.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  getTitleMenuItems() {
    return this.props.cards.map(item => (
      <MenuItem key={item.title} value={item.title} primaryText={item.title} />
    ));
  }
  checkFarestPoint() {
    const currLocation = { latitude: 34.518611, longitude: 34.408056 };
    let dist;
    return (
      this.props.filteredCards.reduce((maxDist, card) => {
        dist = geolib.getDistance(currLocation, { latitude: card.lng, longitude: card.lat });
        return Math.max(dist, maxDist);
      }, 0) / 1000
    );
  }

  clearFilter() {
    const { max } = this.state;
    this.setState({ orderType: '', title: '', city: '', distance: max });
    this.props.updateFilterCards(this.props.cards);
  }

  filterOrderType(event, index, value) {
    this.setState({ orderType: value });
    const fl = this.props.cards.filter(card =>
      filterHelper.findTypeInArray(card, value));
    this.props.updateFilterCards(fl);
  }
  filterTitle(event, index, value) {
    this.setState({ title: value });
    const fl = this.props.cards.filter(card => card.title === value);
    this.props.updateFilterCards(fl);
  }

  initCities() {
    return this.props.cards.map(card => (
      <MenuItem key={card.city} value={card.city} primaryText={card.city} />
    ));
  }
  filterCity(event, index, value) {
    this.setState({ city: value });
    const fl = this.props.cards.filter(card =>
      card.city.toLowerCase().includes(value.toLowerCase()));
    this.props.updateFilterCards(fl);
  }

  filterDist(event, index, value) {
    this.setState({ distance: value });
    // Working with W3C Geolocation API
    let dist;
    const currLocation = { latitude: 34.518611, longitude: 34.408056 };
    const fl = this.props.cards.filter(card => {
      dist = geolib.getDistance(currLocation, { latitude: card.lng, longitude: card.lat });
      dist /= 1000;
      return dist < value;
    });
    this.props.updateFilterCards(fl);
  }

  render() {
    const { orderType, title, city, distance, menuDistances } = this.state;

    return (
      <FilterStyle>
        <SelectField
          style={SelectItem}
          floatingLabelText="Order-Type"
          value={orderType}
          onChange={this.filterOrderType}
        >
          <MenuItem value={null} primaryText="" />
          <MenuItem value="takeOut" primaryText="take out" />
          <MenuItem value="sit" primaryText="sit" />
        </SelectField>

        <SelectField
          style={SelectItem}
          floatingLabelText="title"
          value={title}
          onChange={this.filterTitle}
        >
          <MenuItem value={null} primaryText="" />
          {this.getTitleMenuItems()}
        </SelectField>

        <SelectField
          style={SelectItem}
          floatingLabelText="location"
          value={city}
          onChange={this.filterCity}
        >
          <MenuItem value={null} primaryText="" />
          {this.initCities()}
        </SelectField>

        <SelectField
          style={SelectItem}
          floatingLabelText="distance"
          value={distance}
          onChange={this.filterDist}
        >
          {menuDistances}
        </SelectField>

        <div>
          <span>{distance || 0} km</span>
        </div>

        <FlatButton style={ButtonItem} label="Clear" primary onClick={this.clearFilter} />
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
  filteredCards: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.string,
    city: PropTypes.string,
    orderType: PropTypes.arrayOf(PropTypes.string),
    lng: PropTypes.number,
    lat: PropTypes.number
  })).isRequired,
  updateFilterCards: PropTypes.func.isRequired
};

export default Filter;
