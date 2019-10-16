import React from 'react';
import Players from './Players.js';
import Home from './Home.js';
import Games from './Games.js';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

const navigation = (props) => {
    return (
        <div>
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
                        <Route path="/players" component={Players} />
                        <Route path="/games" component={Games} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default navigation;