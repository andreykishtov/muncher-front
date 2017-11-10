import React, { Component } from 'react';
import GridListCards from '../../components/GridListCards/GridListCards';
import { Main, Search, Left } from './HomePage.styles';
import data from './data';
import MapWithMarkers from '../../components/Maps/MapWithMarkers';
import Filter from '../../components/Filter/filter';
import BottomLeft from '../../components/FeaturedCard/FeaturedCard';

class HomePage extends Component {
  constructor() {
    super();

    const filteredCards = data.cards;
    const { cards } = data;
    this.state = { cards, filteredCards };
    this.updateFilterCards = this.updateFilterCards.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }



  onMarkerClick(cardId) {
    this.setState({ cardId });
  }

  updateHeight(height) {
    this.setState({ height });
  }

  selectCard(isSelected) {
    this.setState({ isSelected });
  }
  applyStyle(id) {
    if (this.state.isSelected === id);
  }
  updateFilterCards(fl) {
    this.setState({ filteredCards: fl });
  }

  render() {
    const { cardId } = this.state;
    const { filteredCards, cards } = this.state;
    console.log(data);
    return (
      <div>
        <Main>
          <Search gridArea="search">Search will be here</Search>
          <Left gridArea="left">
            <MapWithMarkers
              onMarkerClick={this.onMarkerClick}
              dataMarkers={data.cards}
              height={150}
              lat={34}
              lng={32}
            />
          </Left>
          <GridListCards filteredCards={filteredCards} {...data} />
          </Main>
      </div>
    )
  }

}

export default HomePage;
