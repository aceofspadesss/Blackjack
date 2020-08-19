let playerMoney = 2500;
let bet = 0;
let playerHand = new Array;
let houseHand = new Array;
let win = 0;
let loss = 0;
let tie = 0;

(shuffle = () => {
    fetch('https://deckofcardsapi.com/api/deck/op5lf0rk6yun/shuffle/')
        .then(response => {
            return response.json().then((data) => {
                console.log(data)
            })
        })
})();

const result = () => {
    let houseScore = parseInt($('.house-score').text());
    let playerScore = parseInt($('.player-score').text());

    if (houseScore < playerScore){
        $('.result').css('display', 'block');
        $('.result-text').text('YOU WIN');
        win = win + 1;
    } else if (houseScore > playerScore){
        $('.result').css('display', 'block');
        $('.result-text').text('YOU LOSE');
        loss = loss + 1;
    } else if (houseScore == playerScore){
        $('.result').css('display', 'block');
        $('.result-text').text('DRAW');
        tie = tie + 1;
    }
    winRatio();
}
const winRatio = () => {
    let games = win + loss + tie;
    let ratio = Math.round(((win + 0.5 * tie) / games) * 100);
    $('.winrate').text(`Winrate: ${ratio}%`);
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

                $('.player-score').text(playerPoints);
                $('.house-score').text(housePoints);
                $('.deck').text(data.remaining);

                if (playerPoints > 21){
                    $('.result').css('display', 'block');
                    $('.result-text').text('YOU LOSE');
                    loss = loss + 1;
                }

                
                
                })
            })
}

$('.new-game').click(() => {
    $('.main-menu').css('display', 'none');
    $('.betting').css('display', 'flex');
    shuffle();
})

$('.money').text(`Money: $${playerMoney}`);
$('.bet').text(`Bet: $${bet}`);
$('.game-m-counter').text(`Money: $${playerMoney}`);
$('.game-b-counter').text(`Bet: $${bet}`);

$('#chip500').click(() => {
    if (playerMoney == 0){
        this.prop('disabled', true);
    } else if (playerMoney < 0){
        playerMoney = 0;
        $('.money').text(`Money: $${playerMoney}`);
        $('.game-m-counter').text(`Money: $${playerMoney}`);
        this.prop('disabled', true)
    }

    bet += 500;
    playerMoney -= 500;
    $('.money').text(`Money: $${playerMoney}`);
    $('.bet').text(`Bet: $${bet}`);
    $('.game-m-counter').text(`Money: $${playerMoney}`);
    $('.game-b-counter').text(`Bet: $${bet}`);

    $('<div class="bet500"><p class="chip-value">500</p></div>').appendTo('.betting-choice');

    $('.deal-wrapper').css({animationFillMode: 'forwards', animationName: 'deal-popup', animationDuration: '1s'});

    $('.bet500').click(() => {
        $('.bet500').css({animationFillMode: 'backwards', animationName: 'roll-back-bet-500', animationDuration: '1s', animationDirection: 'backwards'});
        bet -= 500;
        playerMoney += 500;
        $('.money').text(`Money: $${playerMoney}`);
        $('.bet').text(`Bet: $${bet}`);
        $(this).delay(1000).fadeOut(300, function(){
            $(this).remove();
         });
    })
})

$('#chip100').click(() => {
    if (playerMoney == 0){
        this.prop('disabled', true);
    } else if (playerMoney < 0){
        playerMoney = 0;
        $('money').text(`Money: $${playerMoney}`);
        $('.game-m-counter').text(`Money: $${playerMoney}`);
        this.prop('disabled', true)
    }

    bet += 100;
    playerMoney -= 100;
    $('.money').text(`Money: $${playerMoney}`);
    $('.bet').text(`Bet: $${bet}`);
    $('.game-m-counter').text(`Money: $${playerMoney}`);
    $('.game-b-counter').text(`Bet: $${bet}`);

    $('<div class="bet100"><p class="chip-value">100</p></div>').appendTo('.betting-choice');

    $('.deal-wrapper').css({animationFillMode: 'forwards', animationName: 'deal-popup', animationDuration: '1s'});

    $('.bet100').click(() => {
        $('.bet100').css({animationFillMode: 'backwards', animationName: 'roll-back-bet-100', animationDuration: '1s', animationDirection: 'backwards'});
        bet -= 100;
        playerMoney += 100;
        $('.money').text(`Money: $${playerMoney}`);
        $('.bet').text(`Bet: $${bet}`);
        $('.bet100').delay(1000).fadeOut(300, function(){
            $(this).remove();
         });
    })
})

$('#chip10').click(() => {
    if (playerMoney == 0){
        this.prop('disabled', true);
    } else if (playerMoney < 0){
        playerMoney = 0;
        $('.money').text(`Money: $${playerMoney}`);
        $('.game-m-counter').text(`Money: $${playerMoney}`);
        this.prop('disabled', true)
    }

    bet += 10;
    playerMoney -= 10;
    $('.money').text(`Money: $${playerMoney}`);
    $('.bet').text(`Money: $${bet}`);
    $('.game-m-counter').text(`Money: $${playerMoney}`);
    $('.game-b-counter').text(`Bet: $${bet}`);

    $('<div class="bet10"><p class="chip-value">10</p></div>').appendTo('.betting-choice');

    $('.deal-wrapper').css({animationFillMode: 'forwards', animationName: 'deal-popup', animationDuration: '1s'});

    $('.bet10').click(() => {
        $('.bet10').css({animationFillMode: 'backwards', animationName: 'roll-back-bet-10', animationDuration: '1s', animationDirection: 'backwards'});
        bet -= 10;
        playerMoney += 10;
        $('.money').text(`Money: $${playerMoney}`);
        $('.bet').text(`Bet: $${bet}`);
        $('.bet10').delay(1000).fadeOut(300, function(){
            $(this).remove();
         });
    })
})

$('#chip1').click(() => {
    if (playerMoney == 0){
        this.prop('disabled', true);
    } else if (playerMoney < 0){
        playerMoney = 0;
        $('.money').text(`Money: $${playerMoney}`);
        $('.game-m-counter').text(`Money: $${playerMoney}`);
        this.prop('disabled', true)
    }

    bet += 1;
    playerMoney -= 1;
    $('.money').text(`Money: $${playerMoney}`);
    $('.bet').text(`Bet: $${bet}`);
    $('.game-m-counter').text(`Money: $${playerMoney}`);
    $('.game-b-counter').text(`Bet: $${bet}`);

    $('<div class="bet1"><p class="chip-value">1</p></div>').appendTo('.betting-choice');

    $('.deal-wrapper').css({animationFillMode: 'forwards', animationName: 'deal-popup', animationDuration: '1s'});

    $('.bet1').click(() => {
        $('.bet1').css({animationFillMode: 'backwards', animationName: 'roll-back-bet-1', animationDuration: '1s', animationDirection: 'backwards'});
        bet -= 1;
        playerMoney += 1;
        $('.money').text(`Money: $${playerMoney}`);
        $('.bet').text(`Bet: $${bet}`);
        $('.bet1').delay(1000).fadeOut(300, function(){
            $(this).remove();
         });
    })
})

$('.game-deal').click(() => {
    game(playerHand, 2, 'player-hand');
    game(houseHand, 2, 'house');
    $('.game-window').css('display', 'block')
    $('.game-deal').prop('disabled', true);
})
$('.game-hit').click(() => {
    game(playerHand, 1, 'player-hand');
})
$('.game-stand').click(() => {
    let houseScore = parseInt($('.house-score').text());

    if (houseScore < 17){
        game(houseHand, 1, 'house');
    }
    result();
})


$('.result').click(() => {
    let deck = parseInt($('.deck').text());
    if (deck < 10){
        shuffle();
        $('.deck').text('52');
    }
    
    playerHand = [];
    houseHand = [];
    $('.player-score').text('0');
    $('.house-score').text('0');
    $('.result').css('display', 'none');
    $('.card').remove();
    $('.game-deal').prop('disabled', false);

    $('.game-chips').css('display', 'flex')
})

