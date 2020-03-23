import React from 'react';
import './App.css';

import logo from './resource/img/logo.png';

import categories from './resource/ic/black/ic_categories.png';
import catalog from './resource/ic/black/ic_playlist_add_check.png';
import myList from './resource/ic/black/ic_list.png';
import liveHelp from './resource/ic/black/ic_chat.png';
import pim from './resource/ic/black/ic_check_circle.png';
import account from './resource/ic/black/ic_person.png';
import branchLocations from './resource/ic/black/ic_place.png';
import searchBlack from './resource/ic/black/ic_search.png';

import icmenu from './resource/ic/white/ic_menu.png';
import icperson from './resource/ic/white/ic_person.png';
import icsearch from './resource/ic/white/ic_search.png';
import icshoppingcart from './resource/ic/white/ic_shopping_cart.png';

import datacomm from './resource/img/datacomm.png';
import hvac from './resource/img/hvac.png';
import industrial from './resource/img/industrial.png';
import lighting from './resource/img/lighting.png';
import energy from './resource/img/energy.png';
import utility from './resource/img/utility.png';

import plattPlus from './resource/img/platt-plus.png';
import todayDeals from './resource/panel/deal.png';
import recent11 from './resource/recent/11.png';
import recent22 from './resource/recent/22.png';

import superTool from './resource/img/super-tool-day.png';
import locationB from './resource/img/ic_location_b.png';
import helpCenter from './resource/img/ic_helpcenter.png';
import plattUniversity from './resource/img/ic_platt-u.png';
import appStore from './resource/panel/app-get-banner.png';
import comment from './resource/ic/black/ic_comment.png';

import catMobile from './resource/ic/green/ic_line_style.png';
import searchMobile from './resource/ic/green/ic_search.png';
import scanMobile from './resource/ic/green/ic_scanner.png';


class Autocomplete extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = event => {
    const { suggestions } = this.props;
    let userInput = event.currentTarget.value;

    let filterSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      filteredSuggestions: filterSuggestions,
      showSuggestions: true,
      userInput: event.currentTarget.value
    });
  };

  onClick = event => {
    this.setState({
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText
    });
  };

  render() {
    const {
      onChange,
      onClick,
      state: {
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsList;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsList = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion) => {
              return (
                <li
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsList = (
          <ul className="suggestions">
            <li>No match.</li>
          </ul>
        );
      }
    }

    return (
      <div className="autocomplete">
        <input
          type="text"
          onChange={onChange}
          value={userInput}
          name="search"
          placeholder="What are you looking for?"
        />
        {suggestionsList}
      </div>
    );
  }
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      swArray: [],
      loading: true,
    };
  }

  menuItems = [
    {src: categories, text: "Shop all categories"},
    {src: catalog, text: "My Catalog"},
    {src: myList, text: "My List"},
    {src: liveHelp, text: "Live Help"},
    {src: pim, text: "PIM"},
    {src: account, text: "Account"},
    {src: branchLocations, text: "Branch Locations"},
  ];

  productMarkets = [
    {src: datacomm, text: "DataComm"},
    {src: hvac, text: "HVAC"},
    {src: industrial, text: "Industrial"},
    {src: lighting, text: "Lighting"},
    {src: energy, text: "Energy Efficiency"},
    {src: utility, text: "Utility"}
  ];

  helpfulLinks = [
    {src: superTool, text: "Super Tool Day & Dynamic Data Day"},
    {src: locationB, text: "Branch Locations"},
    {src: helpCenter, text: "Help Center"},
    {src: plattUniversity, text: "Platt University"},
  ];

  populateMenu() {
    let populatedMenu = [];
    for (let menuItem of this.menuItems) {
        populatedMenu.push(
            <li 
                key={menuItem.text}
            >
              <figure>
                <img src={menuItem.src} alt={menuItem.text} />
              </figure>
              <span>{menuItem.text}</span>
            </li>
        )
    }
    return (populatedMenu);
  }

  populateMarkets() {
    let populatedMarkets = [];
    for (let market of this.productMarkets) {
        populatedMarkets.push(
            <div 
                key={market.text}
            >
              <div><img src={market.src} alt={market.text} /></div>
              <div><h4>{market.text}</h4></div>
            </div>
        )
    }
    return (populatedMarkets);
  }

  populateLinks() {
    let populatedLinks = [];
    for (let link of this.helpfulLinks) {
        populatedLinks.push(
            <div 
                className="populated-link"
                key={link.text}
            >
              <img src={link.src} alt={link.text} />
              <h4>{link.text}</h4>
            </div>
        )
    }
    return (populatedLinks);
  }

  async retrieveAPI() {
    /* Retrieves json from swapi using open cors-anywhere proxy */
    this.setState({ loading: true });
    const proxyUrl = 'https://cors-anywhere.herokuapp.com';
    const useUrl = 'http://swapi.co/api/planets/';
    const proxiedRequest = (url, options) =>
      fetch(`${proxyUrl}/${url}`, {
        ...options,
      })
      .then(res => res.json())
      .catch(error => console.error(error))
    let dataArray = [];
    await proxiedRequest(useUrl)
      .then((data) => {
        dataArray.push(data);
      })
      .catch(error => console.error(error))
    let filteredData = dataArray[0].results;
    let nameArray = [];
    for (let filteredItem of filteredData) {
      nameArray.push(filteredItem.name);
    }
    this.setState({ swArray: nameArray });
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.retrieveAPI();
  }

  render() {
    return (
      <div className="App">
        <div className="App-inner">
          <header className="App-header">
            <div className="top-bar">
              <div className="top-left">
                <img src={logo} alt="Platt Logo" />
              </div>
              <div className="top-right">
                <img src={icsearch} alt="search" />
                <img src={icshoppingcart} alt="cart" />
                <img src={icperson} alt="profile" />
                <img src={icmenu} alt="menu" />
              </div>
            </div>
            {this.state.loading ? (
              <img src={searchBlack} className="loading-search search-button" alt="loading" />
            ) : (
              <img src={searchBlack} className="search-button" alt="search" />
            )}
            <Autocomplete 
              suggestions={this.state.swArray}
            />
          </header>
          <nav className="App-menu">
            <ul>
              {this.populateMenu()}
            </ul>
          </nav>
          <main className="App-main">
            <section className="product-markets">
              <h2>Product Markets</h2>
              {this.populateMarkets()}
            </section>
            <section className="mobile-area">
              <div>
                <button>
                  <img src={catMobile} alt="Categories" />
                </button>
                <h4>Categories</h4>
              </div>
              <div>
                <button>
                  <img src={searchMobile} alt="Search" />
                </button>
                <h4>Search</h4>
              </div>
              <div>
                <button>
                  <img src={scanMobile} alt="Scan" />
                </button>
                <h4>Scan</h4>
              </div>
            </section>
            <section className="get-started">
              <img src={plattPlus} alt="Get Started" />
              <div>
                <h2>Get Started Today</h2>
                <h3>Become a <span className="green-text">Platt Plus</span> Member.</h3>
                <button>Learn More</button>
              </div>
            </section>
            <section className="helpful-links">
              <img src={todayDeals} className="deals" alt="deals" />
              <div className="recent">
                <div><h4>Recently Viewed</h4></div>
                <div><h4 className="green-text">View All</h4></div>
                <img src={recent11} alt="Recent Products" />
                <img src={recent22} alt="Recent Products" />
                <img src={recent22} alt="Recent Products" />
              </div>
              {this.populateLinks()}
            </section>
            <section className="app-links">
              <img src={appStore} alt="App Links" />
              <div><h4>Shop better, download the Platt App today</h4></div>
            </section>
          </main>
          <footer className="App-footer">
            <div className="footer-column">
              <h3 className="gray-text">Support Center</h3>
              <div>
                <h3>800-25-Platt</h3>
                <h4>800-257-5288</h4>
              </div>
              <div className="gray-text">
                <h3>4 a.m. - 12 a.m. (pst)</h3>
                <h3>7 Days a week</h3>
              </div>
              <button>
                <img src={comment} alt="Live Help" />
                Live Help
              </button>
            </div>
            <div className="footer-bottom gray-text">
              <div><h4>Contact Us</h4></div>
              <div><h4>What's New</h4></div>
              <div><h4>FAQ's</h4></div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
