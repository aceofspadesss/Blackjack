import React from 'react';
import '../css/TitleScreen.css';
import BG from '../images/bg.jpg';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const TitleScreen = () => {
            return(
                <div className="main-menu">
                    <img className="main-bg" alt="background" src={BG}/>
                    <p className="title">BLACKJACK</p>
                    <span className="btn-effect-left"></span>
                    <span className="btn-effect-right"></span>
                    <Link className="new-game" to="/game/" style={{zIndex: '300'}}>NEW GAME</Link>
                </div>
            )
        }

export default TitleScreen;