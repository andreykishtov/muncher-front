import { Card } from 'antd';
import React, { Component } from 'react';
import GridCards from '../../components/GridCards/GridCards';
import { Main, Search, Left, Right, BottomLeft } from './HomePage.styles';
import LocationCard from '../../components/LocationCard/LocationCard';
import data from './data';
import MapWithMarkers from '../../components/Maps/MapWithMarkers';
import Filter from '../../components/Filter/filter';
import FeaturedCard from '../../components/FeaturedCard/FeaturedCard';
import CallToActionDialog from '../../components/CallToActionDialog/CallToActionDialog';

const itemsPerPage = 6;

class HomePage extends Component {
  state = {
    cards: data.cards,
    filteredCards: data.cards,
    paginationData: [],
    dataMarkers: [],
    toggleCTADialog: false,
    paginationSection: [],
    pageNum: 1,
    selectedRest: {},
    special: {}
  };

  componentWillMount = () => {
    const special = this.getRandomCard();
    this.updatePaginationCards(data.cards);
    this.setState({ special });
  };

  onMarkerClick = (id, borderType = '#EAE8F2') => {
    const { dataMarkers } = this.state;
    const myElement = document.getElementById(id);
    const topPos = myElement.parentElement.parentElement.offsetTop;
    document.getElementById('cardWrapper').scrollTop = topPos;
    const selectedCard = dataMarkers.map(card =>
      (card.id === id
        ? { ...card, selected: borderType, showInfo: !card.showInfo }
        : { ...card, showInfo: false, selected: null }));
    this.setState({ dataMarkers: selectedCard });
  };

  getRandomCard = () => this.state.cards[Math.floor(Math.random() * this.state.cards.length)];

  updatePagination = (pageNumber, paginationData1, filteredCardsFunc) => {
    let { filteredCards, paginationData, pageNum } = this.state;
    pageNum = pageNumber || pageNum;
    filteredCards = filteredCardsFunc || filteredCards;
    paginationData = typeof paginationData1 === 'number' ? paginationData : paginationData1;
    const startIndex = (pageNum - 1) * itemsPerPage;
    const paginationSection = paginationData.slice(startIndex, startIndex + itemsPerPage);
    const dataMarkers = filteredCards.slice(startIndex, startIndex + itemsPerPage);
    if (filteredCardsFunc) {
      pageNum = 1;
    }
    this.setState({ paginationData, paginationSection, dataMarkers, pageNum });
  };

  updatePaginationCards = filteredCards => {
    const paginationData = filteredCards.map(tile => (
      <Card.Grid
        key={tile.title}
        style={{ width: '30%', textAlign: 'center', padding: '0px', margin: '0 5px 10px 5px' }}
      >
        <LocationCard
          id={tile.id}
          key={tile.title}
          {...tile}
          toggleCTADialog={this.toggleCTADialog}
          redirectToLocation={this.redirectToLocation}
          onCardClick={this.onMarkerClick}
        />
      </Card.Grid>
    ));

    this.updatePagination(undefined, paginationData, filteredCards);
  };

  redirectToLocation = (history, id) => history.push(`/location/${id}`);

  applyStyle = id => this.state.isSelected === id;

  updateFilterCards = filteredCards => this.setState({ filteredCards });

  toggleCTADialog = restId => {
    const previousState = this.state.toggleCTADialog;
    this.setState({ toggleCTADialog: !previousState });
    this.findRestById(restId);
  };

  findRestById = restId => {
    const selectedRest = this.state.filteredCards.find(rest => rest.id === restId);
    this.setState({ selectedRest });
  };

  render() {
    const { special, filteredCards, cards, dataMarkers, pageNum, paginationSection } = this.state;

    return (
      <Main>
        <Search gridArea="search">
          <Filter
            cards={cards}
            updateFilterCards={this.updateFilterCards}
            updatePaginationCards={this.updatePaginationCards}
          />
        </Search>
        <Right gridArea="right">
          <GridCards
            pageSize={itemsPerPage}
            filteredCards={filteredCards}
            paginationSection={paginationSection}
            pageNum={pageNum}
            updatePagination={this.updatePagination}
          />
          <CallToActionDialog
            selectedRest={this.state.selectedRest}
            open={this.state.toggleCTADialog}
            toggleCTADialog={this.toggleCTADialog}
          />
        </Right>
        <Left gridArea="left">
          <MapWithMarkers
            onMarkerClick={this.onMarkerClick}
            dataMarkers={dataMarkers}
            lat={34}
            lng={32}
            defaultZoom={4}
          />
        </Left>
        <BottomLeft gridArea="bottomLeft">
          <FeaturedCard
            special={special}
            cards={dataMarkers}
            redirectToLocation={this.redirectToLocation}
            toggleCTADialog={this.toggleCTADialog}
            onCardClick={this.onMarkerClick}
          />
        </BottomLeft>
      </Main>
    );
  }
}

export default HomePage;
