import React, { useState } from 'react';
import TitleScreen from './TitleScreen';
import BetScreen from './BetScreen';
import GameScreen from './GameScreen';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = (props, money, setMoney, bet, setBet) => {
    return(
        <div>
            <Router>
                    <Switch>
                        <Route path="/" component={TitleScreen} exact />
                        <Route path="/game/" component={() => <BetScreen money={money} bet={bet} setMoney={setMoney} setBet={setBet} />} exact />
                </Switch>
            </Router>
            
        </div>
    )
}

export default App;