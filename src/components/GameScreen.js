import React, { useEffect, useState } from 'react';
import '../css/GameScreen.css';
import BetScreen from './BetScreen';
import deckofcards from '../api/deckofcards';
import Chip from '../images/chip.png';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const GameScreen = ({props, money, setMoney, bet, setBet, disabledChip500, disabledChip100, disabledChip10, disabledChip1, setDisabledChip500, setDisabledChip100, setDisabledChip10, setDisabledChip1, changeComponent, setChangeComponent}) => {
    const KEY = 'sv43w4pcmb5x'
    const [playerHand, setPlayerHand] = useState({ data: [] });
    const [playerPoints, setPlayerPoints] = useState({ value: [] })
    const [houseHand, setHouse] = useState({ data: [] })
    const [housePoints, setHousePoints] = useState({ value: [] })
    const [deckCounter, setDeckCounter] = useState(null);
    const [resultDisplay, setResultDisplay] = useState('none');
    const [resultText, setResultText] = useState('');
    const [showChips, setShowChips] = useState('none');
    const [win, setWin] = useState(0);
    const [draw, setDraw] = useState(0);
    const [loss, setLoss] = useState(0)
    const [winRate, setWinRate] = useState(0);

    const deckStatus = async () => {
        const response = await deckofcards.get(`/${KEY}/`)
        setDeckCounter(response.data.remaining)
    }

    const deckShuffle = async () => {
        const response = await deckofcards.get(`/${KEY}/shuffle/`)
    }

    const drawCard = async (who, assign, count) => {
        const response = await deckofcards.get(`/${KEY}/draw/?count=${count}`)

        who({data: response.data.cards})
        assign({value: Number(response.data.cards[0].value) + Number(response.data.cards[1].value)})

        deckStatus()
    }

    const hit = async() => {
        const response = await deckofcards.get(`/${KEY}/draw/?count=1`)
        setPlayerHand({data: [...playerHand.data, response.data.cards[0]]})
        setPlayerPoints({value: playerPoints.value + Number(response.data.cards[0].value)})
        deckStatus()
    }

    const stand = async() => {
            if (housePoints.value < 17){
                const response = await deckofcards.get(`/${KEY}/draw/?count=1`)
                setHouse({data: [...houseHand.data, response.data.cards[0]]})
                setHousePoints({value: housePoints.value + Number(response.data.cards[0].value)});

                if (playerPoints.value > housePoints.value){
                    setResultText('YOU WIN!');
                    setWin(win + 1);
                    setMoney(money + (bet * 2));
                    setBet(0);
                } else if (playerPoints.value === housePoints.value) {
                    setResultText('DRAW');
                    setDraw(draw + 1);
                    setMoney(money + bet);
                    setBet(0);
                } else if (playerPoints.value < housePoints.value) {
                    setResultText('YOU LOSE');
                    setLoss(loss + 1);
                    setBet(0);
                }
            } else {
                score()
            }

           
        deckStatus()
    }

    const score = () => {
        if (playerPoints.value > housePoints.value){
            setResultText('YOU WIN!');
            setWin(win + 1);
            setMoney(money + (bet * 2));
            setBet(0);
        } else if (playerPoints.value === housePoints.value) {
            setResultText('DRAW');
            setDraw(draw + 1);
            setMoney(money + bet);
            setBet(0);
        } else if (playerPoints.value < housePoints.value) {
            setResultText('YOU LOSE');
            setLoss(loss + 1);
            setBet(0);
        }
    }

    const firstRun = () => {
        setWinRate(100)
        deckStatus()
        drawCard(setPlayerHand, setPlayerPoints, 2)
        drawCard(setHouse, setHousePoints, 2)
    }

    const winRatio = () => {
        let games = win + loss + draw;
        setWinRate(Math.round(((win + 0.5 * draw) / games) * 100));
    }

    const refill = () => {
        if (money === 0) {
            setMoney(2500)
        }
    }

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

    useEffect(() => {
        winRatio()
    }, [win, draw, loss])

    useEffect(() => {
        if (deckCounter < 4){
            deckShuffle()
        }
    }, [deckCounter])

    for (let i = 0; i < playerHand.data.length; i++){
        if (playerHand.data[i].value === 'JACK' || playerHand.data[i].value === 'QUEEN' || playerHand.data[i].value === 'KING'){
            playerHand.data[i].value = 10;
        } else if(playerHand.data[i].value === 'ACE'){
            playerHand.data[i].value = 11;
        }
    }

    for (let i = 0; i < houseHand.data.length; i++){
        if (houseHand.data[i].value === 'JACK' || houseHand.data[i].value === 'QUEEN' || houseHand.data[i].value === 'KING'){
            houseHand.data[i].value = 10;
        } else if(houseHand.data[i].value === 'ACE'){
            houseHand.data[i].value = 11;
        }
    }

    useEffect(() => {
        firstRun()
    }, [])

    useEffect(() => {
        if (playerPoints.value > 21){
            setResultDisplay('flex');
            setResultText('YOU LOSE');
            setLoss(loss + 1);
            setBet(0);
        }
    }, [playerPoints.value])



    return(
        <div className="game-window">
                <div className="game-chips" style={{display: showChips, flexDirection: 'column'}}>
                <div className="chips-wrapper">
                    <div className="chip game-chip" id="g-chip500" style={{
                                                                        backgroundImage: Chip, 
                                                                        backgroundSize: 'cover',
                                                                        display: disabledChip500
                                                                        }}

                                                                    onClick={() => {
                                                                        setMoney(c => c - 500);
                                                                        setBet(c => c + 500);
                                                                    }}
                    >
                        <p className="chip-value">500</p>
                    </div>
                    <div className="chip game-chip" id="g-chip100"  style={{
                                                                        backgroundImage: Chip, 
                                                                        backgroundSize: 'cover',
                                                                        display: disabledChip100
                                                                        }}

                                                                    onClick={() => {
                                                                        setMoney(c => c - 100);
                                                                        setBet(c => c + 100);
                                                                    }}
                    >
                        <p className="chip-value">100</p>
                    </div>
                    <div className="chip game-chip" id="g-chip10"   style={{
                                                                        backgroundImage: Chip, 
                                                                        backgroundSize: 'cover',
                                                                        display: disabledChip10
                                                                        }}

                                                                    onClick={() => {
                                                                        setMoney(c => c - 10);
                                                                        setBet(c => c + 10);
                                                                    }}
                    >
                        <p className="chip-value">10</p>
                    </div>
                    <div className="chip game-chip" id="g-chip1"    style={{
                                                                        backgroundImage: Chip, 
                                                                        backgroundSize: 'cover',
                                                                        display: disabledChip1
                                                                        }}

                                                                    onClick={() => {
                                                                        setMoney(c => c - 1);
                                                                        setBet(c => c + 1);
                                                                    }}
                    >
                        <p className="chip-value">1</p>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button className="submit" onClick={() => {
                                                    setShowChips('none')
                                                    drawCard(setPlayerHand, setPlayerPoints, 2);
                                                    drawCard(setHouse, setHousePoints, 2);
                                                }} >Submit</button>
                    </div>
            </div>
                <div className="counters-mask"></div>
                <div className="counters">
                    <div className="game-money"><p className="game-text game-m-counter">Money: ${money}</p></div>
                    <div className="game-bet"><p className="game-text game-b-counter">Bet: ${bet}</p></div>
                    <div className="game-winrate"><p className="game-text winrate">Win Ratio: {winRate}%</p></div>
                </div>
                <div className="table">
                    <div className="player-hand">
                        {playerHand.data.map(card => <img src={card.image} />)}
                        <div className="player-score">
                           {playerPoints.value}
                        </div>
                    </div>
                    <div className="deck">
                        {deckCounter}
                    </div>
                    <div className="house">
                        {houseHand.data.map(card => <img src={card.image} />)}
                        <div className="house-score">
                            {housePoints.value}
                        </div>
                    </div>
                </div>
                <div className="game-buttons-mask"></div>
                <div className="game-buttons">
                        <Link to="/" className="game-deal" onClick={() => {setChangeComponent(1)}}><p style={{marginTop: '15px'}}>RESET</p></Link>
                        <button className="game-hit" onClick={() => {hit()}}>Hit</button>
                        <button className="game-stand" 
                            onClick={() => {
                                        stand();
                                        setResultDisplay('flex');
                                    }}>Stand</button>
                </div>
                <div className="result" style={{display: resultDisplay, justifyContent: 'center', alignItems: 'center'}} onClick={() => {
                                                                                        setResultDisplay('none');
                                                                                        setShowChips('flex');
                                                                                        refill()}} >
                    <div className="result-mask"></div>
                    <div className="result-text">{resultText}</div>
                </div>
            </div>
    )
}

export default GameScreen;