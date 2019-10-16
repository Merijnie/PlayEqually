import React from 'react';
import './App.css';
import Navigation from './Navigation.js';
import Players from './Players.js';
import Home from './Home.js';
import Games from './Games.js';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store/index.js";

class App extends React.Component {

  state = {
    players: [],
    error: ""
  }

  getDBPlayers() {
    fetch("http://localhost:5001/players")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            players: result
          });
        },
        (error) => {
          this.setState({
            error: error
          });
        }
      )
  }

  componentDidMount() {
    this.getDBPlayers();
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {/* <Navigation />
        <div> */}
        <BrowserRouter>
          <div id="navbar">
            <div id="links">
              <Link to="/">Overview</Link>
              <Link to="/players">Players</Link>
              <Link to="/games">Games</Link>
            </div>
          </div>
          <div id="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/players" 
                      render={(props) =>
                      <Players  {...props} players={this.state.players} />} />
              <Route path="/games"
                      render={(props) =>
                      <Games {...props} title="Wedstrijden" />} />
            </Switch>
          </div>
        </BrowserRouter>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
