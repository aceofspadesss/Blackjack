import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../css/BetScreen.css';
import Chip from '../images/chip.png'
import GameScreen from './GameScreen'

const BetScreen = ({props}) => {
    const [changeComponent, setChangeComponent] = useState(0);
    const [placedBet, setPlacedBet] = useState([]);
    const [dealTrigger, setDealTrigger] = useState(0);
    const [betAnimation, setBetAnimation] = useState({fill: 'forwards'});
    const [disabledChip500, setDisabledChip500] = useState('block');
    const [disabledChip100, setDisabledChip100] = useState('block');
    const [disabledChip10, setDisabledChip10] = useState('block');
    const [disabledChip1, setDisabledChip1] = useState('block');
    const [money, setMoney] = useState(2500);
    const [bet, setBet] = useState(0);

    let moneyDisplay = `Money: $${money}`;
    let betDisplay = `Bet: $${bet}`;

    let bet1 = <div 
                    className="bet1" id="bet1"
                    style={{
                        animationFillMode: betAnimation.fill,
                        animationName: 'roll-out-bet-1',
                        animationDuration: '1s',
                        zIndex: '10'
                    }}
                    onClick={() => {
                        setMoney(c => c + 1);
                        setBet(c => c - 1);
                        setDealTrigger(c => c - 1);
                        delete1();
                        }  
                    }
                    ><p className="chip-value">1</p></div>;
    let bet10 = <div 
                className="bet10" id="bet10"
                style={{
                    animationFillMode: betAnimation.fill,
                    animationName: 'roll-out-bet-10',
                    animationDuration: '1s',
                    zIndex: '10'
                }}
                onClick={() => {
                    setMoney(c => c + 10);
                    setBet(c => c - 10);
                    setDealTrigger(c => c - 1);
                    delete10();
                    }  
                }
                    ><p className="chip-value">10</p></div>;
    let bet100 = <div 
                    className="bet100" id="bet100"
                    style={{
                        animationFillMode: betAnimation.fill,
                        animationName: 'roll-out-bet-100',
                        animationDuration: '1s',
                        zIndex: '10'
                    }}
                    onClick={() => {
                        setMoney(c => c + 100);
                        setBet(c => c - 100);
                        setDealTrigger(c => c - 1);
                        delete100();
                        }  
                    }
                    ><p className="chip-value">100</p></div>;
    let bet500 = <div 
                    className="bet500" id="bet500"
                    style={{
                        animationFillMode: betAnimation.fill,
                        animationName: 'roll-out-bet-500',
                        animationDuration: '1s',
                        zIndex: '10'
                    }}
                    onClick={() => {
                        setMoney(c => c + 500);
                        setBet(c => c - 500);
                        setDealTrigger(c => c - 1);
                        delete500();
                        }  
                    }
                ><p className="chip-value">500</p></div>;

    useEffect(() => {
        if(money < 500){
            setDisabledChip500('none');
        } 
        if (money < 100) {
            setDisabledChip500('none');
            setDisabledChip100('none');
        } 
        if (money < 10){
            setDisabledChip500('none');
            setDisabledChip100('none');
            setDisabledChip10('none')
        } 
        if (money < 1){
            setDisabledChip500('none');
            setDisabledChip100('none');
            setDisabledChip10('none')
            setDisabledChip1('none')
        } 
        if (money >= 500) {
            setDisabledChip500('block');
            setDisabledChip100('block');
            setDisabledChip10('block');
            setDisabledChip1('block');
        }

        if (money >= 100) {
            setDisabledChip100('block');
            setDisabledChip10('block');
            setDisabledChip1('block');
        }

        if (money >= 10) {
            setDisabledChip10('block');
            setDisabledChip1('block');
        }

        if (money >= 1) {
            setDisabledChip1('block');
        }

        if(money <= 0){
            setMoney(0);
            setBet(2500)
        }
    }, [money])

    const delete500 = () => {
        document.getElementById('bet500').remove();
    }

    const delete100 = () => {
        document.getElementById('bet100').remove();
    }

    const delete10 = () => {
        document.getElementById('bet10').remove();
    }

    const delete1 = () => {
        document.getElementById('bet1').remove();
    }
    
    useEffect(() => {
        
    })
    if (changeComponent === 1){
        return <GameScreen 
                    money={money} 
                    bet={bet} 
                    setMoney={setMoney} 
                    setBet={setBet} 
                    disabledChip1={disabledChip1} 
                    disabledChip10={disabledChip10}
                    disabledChip100={disabledChip100} 
                    disabledChip500={disabledChip500} 
                    setDisabledChip500={setDisabledChip500} 
                    setDisabledChip100={setDisabledChip100} 
                    setDisabledChip10={setDisabledChip10} 
                    setDisabledChip1={setDisabledChip1}
                    changeComponent={changeComponent}
                    setChangeComponent={setChangeComponent}
                />
    } else if (changeComponent === 0) {
        return(
                <div className="betting">
                    <div className="flash-mask"></div>
                    <div className="flash"></div>
                    <div className="flash flash-left"></div>
                    <div className="flash flash-right"></div>
                    <div className="betting-mask-left"></div>
                    <div className="betting-mask-right"></div>
                    <div className="betting-choice">
                        <div className="choice-bg"></div>
                        {placedBet}
                        <div className="money-counter"><p className="money">{moneyDisplay}</p></div>
                        <div className="bet-counter-mask"></div>
                        <div className="bet-counter"><p className="bet">{betDisplay}</p></div>
                        <div className="arrow-set">
                            <div className="arrow500 arrow"></div>
                            <div className="arrow100 arrow"></div>
                            <div className="arrow10 arrow"></div>
                            <div className="arrow1 arrow"></div>
                        </div>
                        <div className="bet-chips">
                            <div 
                                className="chip" 
                                id="chip500" 
                                style={{
                                    backgroundImage: Chip, 
                                    backgroundSize: 'cover',
                                    display: disabledChip500
                                }}
                                onClick={() => {
                                    setMoney(c => c - 500);
                                    setBet(c => c + 500);
                                    setPlacedBet(prevBet => [...prevBet, bet500]);
                                    setDealTrigger(c => c + 1);
                                }}
                            >
                                <p className="chip-value">500</p>
                            </div>
                            <div 
                                className="chip" id="chip100" 
                                style={{
                                    backgroundImage: Chip, 
                                    backgroundSize: 'cover',
                                    display: disabledChip100
                                }}
                                onClick={() => {
                                    setMoney(c => c - 100);
                                    setBet(c => c + 100);
                                    setPlacedBet(prevBet => [...prevBet, bet100]);
                                    setDealTrigger(c => c + 1);
                                }}
                            >
                                <p className="chip-value">100</p>
                            </div>
                            <div 
                                className="chip" 
                                id="chip10" 
                                style={{
                                    backgroundImage: Chip, 
                                    backgroundSize: 'cover',
                                    display: disabledChip10
                                }}
                                onClick={() => {
                                    setMoney(c => c - 10);
                                    setBet(c => c + 10);
                                    setPlacedBet(prevBet => [...prevBet, bet10]);
                                    setDealTrigger(c => c + 1);
                                }}
                            >
                                <p className="chip-value">10</p>
                            </div>
                            <div 
                                className="chip" 
                                id="chip1" 
                                style={{
                                    backgroundImage: Chip, 
                                    backgroundSize: 'cover',
                                    display: disabledChip1,
                                }}
                                onClick={() => {
                                    setMoney(c => c - 1);
                                    setBet(c => c + 1);
                                    setPlacedBet(prevBet => [...prevBet, bet1]);
                                    setDealTrigger(c => c + 1);
                                }}
                            >
                                <p className="chip-value">1</p>
                            </div>
                        </div>
                        <div className="deal-wrapper"><button className="deal" onClick={() => setChangeComponent(1)}>Deal</button></div>
                    </div>
                    <div className="betting-message">
                        <div className="message-bg"></div>
                        <div className="betting-message-mask"></div>
                        <div className="decor-mask"></div>
                        <p className="message">Place Your Bets</p>
                    </div>
                </div>
        )
    }
}

export default BetScreen;