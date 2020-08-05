let playerMoney = 2500;
let bet = 0;
let playerHand = new Array;
let houseHand = new Array;

const shuffle = () => {
    fetch('https://deckofcardsapi.com/api/deck/op5lf0rk6yun/shuffle/')
        .then(response => {
            return response.json().then((data) => {
                console.log(data)
            })
        })
}

const game = (who, count, hand) => {   
    fetch(`https://deckofcardsapi.com/api/deck/op5lf0rk6yun/draw/?count=${count}`)
        .then(response => {
            return response.json().then((data) => {
                console.log(data)
                for (i = 0; i < count; i++){
                    if (data.cards[i].value == 'JACK' || data.cards[i].value == 'QUEEN' || data.cards[i].value == 'KING'){
                        data.cards[i].value = 10;
                    } else if(data.cards[i].value == 'ACE'){
                        data.cards[i].value = 11;
                    }
                }

                for (i = 0; i < count; i++){
                    who.push(Number(data.cards[i].value));
                    $(`<img class="card" src="${data.cards[i].image}">`).appendTo(`.${hand}`);
                }

                let playerPoints = playerHand.reduce(function(a, b){
                    return a += b;
                }, 0)

                let housePoints = houseHand.reduce(function(a, b){
                    return a += b;
                }, 0)

                $('.player-points').text(playerPoints);
                $('.house-points').text(housePoints);

                $('.stand').click(() => {
                    if (housePoints >= 17){
                        fetch(`https://deckofcardsapi.com/api/deck/op5lf0rk6yun/draw/?count=1`)
                    }
                    if (playerPoints == housePoints){
                        playerMoney += bet;
                        bet = 0;
                        console.log('draw');
                    } else if (playerPoints > housePoints){
                        playerMoney += bet * 2;
                        bet = 0;
                        console.log('victory')
                    } else if (playerPoints < housePoints){
                        bet = 0;
                        console.log('you lose')
                    }
                })
            })
    })
}

$('.new-game').click(() => {
    $('.main-menu').css('display', 'none');
    $('.bet').css('display', 'block');
    shuffle();
})

$('.player-money').text(`$${playerMoney}`);
$('.bet-value').text(`$${bet}`);

$('.chip500').click(() => {
    if (playerMoney == 0){
        this.prop('disabled', true);
    } else if (playerMoney < 0){
        playerMoney = 0;
        $('.player-money').text(`$${playerMoney}`);
        this.prop('disabled', true)
    }

    bet += 500;
    playerMoney -= 500;
    $('.bet-value').css('display', 'block');
    $('.player-money').text(`$${playerMoney}`);
    $('.bet-value').text(`$${bet}`);

    $('.deal').css('display', 'block');
})

$('.chip100').click(() => {
    if (playerMoney == 0){
        this.prop('disabled', true);
    } else if (playerMoney < 0){
        playerMoney = 0;
        $('.player-money').text(`$${playerMoney}`);
        this.prop('disabled', true)
    }

    bet += 100;
    playerMoney -= 100;
    $('.bet-value').css('display', 'block');
    $('.player-money').text(`$${playerMoney}`);
    $('.bet-value').text(`$${bet}`);

    $('.deal').css('display', 'block');
})

$('.chip10').click(() => {
    if (playerMoney == 0){
        this.prop('disabled', true);
    } else if (playerMoney < 0){
        playerMoney = 0;
        $('.player-money').text(`$${playerMoney}`);
        this.prop('disabled', true)
    }

    bet += 10;
    playerMoney -= 10;
    $('.bet-value').css('display', 'block');
    $('.player-money').text(`$${playerMoney}`);
    $('.bet-value').text(`$${bet}`);

    $('.deal').css('display', 'block');
})

$('.chip1').click(() => {
    if (playerMoney == 0){
        this.prop('disabled', true);
    } else if (playerMoney < 0){
        playerMoney = 0;
        $('.player-money').text(`$${playerMoney}`);
        this.prop('disabled', true)
    }

    bet += 1;
    playerMoney -= 1;
    $('.bet-value').css('display', 'block');
    $('.player-money').text(`$${playerMoney}`);
    $('.bet-value').text(`$${bet}`);

    $('.deal').css('display', 'block');
})

$('.deal').click(() => {
    game(playerHand, 2, 'player-hand');
    game(houseHand, 2, 'house-hand');
    $('.game-window').css('display', 'block')
    $('.deal').css('display', 'none')
})
$('.hit').click(() => {
    game(playerHand, 1, 'player-hand');
})

const result = () => {
    
}

