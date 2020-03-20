import React from 'react';
import './App.css';

class App extends React.Component {

  menuItems = [
    {src: "", text: "Shop all categories"},
    {src: "", text: "My Catalog"},
    {src: "", text: "My List"},
    {src: "", text: "Live Help"},
    {src: "", text: "PIM"},
    {src: "", text: "Account"},
    {src: "", text: "Branch Locations"},
  ];

  productMarkets = [
    {src: "", text: "DataComm"},
    {src: "", text: "HVAC"},
    {src: "", text: "Industrial"},
    {src: "", text: "Lighting"},
    {src: "", text: "Energy Efficiency"},
    {src: "", text: "Utility"}
  ];

  helpfulLinks = [
    {src: "", text: "Super Tool Day & Dynamic Data Day"},
    {src: "", text: "Branch Locations"},
    {src: "", text: "Help Center"},
    {src: "", text: "Platt University"},
  ];

  populateMenu() {
    let populatedMenu = [];
    for (let menuItem of this.menuItems) {
        populatedMenu.push(
            <li 
                key={menuItem.text}
            >
              <img src={menuItem.src} />
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
              <img src={market.src} />
              <h4>{market.text}</h4>
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
              <img src={link.src} />
              <h4>{link.text}</h4>
            </div>
        )
    }
    return (populatedLinks);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="top-bar">

          </div>
          <input type="text" name="search" placeholder="What are you looking for?"></input>
        </header>
        <nav className="menu">
          <ul>
            {this.populateMenu()}
          </ul>
        </nav>
        <main className="App-main">
          <section className="product-markets">
            <h2>Product Markets</h2>
            {this.populateMarkets()}
          </section>
          <section className="get-started">
            <img src=""/>
            <div>
              <h2>Get Started Today</h2>
              <h3>Become a <span className="green-text">Platt Plus</span> Member.</h3>
              <button>Learn More</button>
            </div>
          </section>
          <section className="helpful-links">
            <img src="" className="deals" />
            <div className="recent">
              <div><h4>Recently Viewed</h4></div>
              <div><h4 className="green-text">View All</h4></div>
              <img src="" />
            </div>
            {this.populateLinks()}
          </section>
          <section className="app-links">
            <img src="" />
            <div><h4>Shop better, download the Platt App today</h4></div>
          </section>
        </main>
        <footer className="App-footer">
          <div className="footer-column">
            <h3>Support Center</h3>
            <div>
              <h3>800-25-Platt</h3>
              <h4>800-257-5288</h4>
            </div>
            <div>
              <h3>4 a.m. - 12 a.m. (pst)</h3>
              <h3>7 Days a week</h3>
            </div>
            <button>
              <img src="" />
              Live Help
            </button>
          </div>
          <div className="footer-bottom">
            <div><h4>Contact Us</h4></div>
            <div><h4>What's New</h4></div>
            <div><h4>FAQ's</h4></div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
