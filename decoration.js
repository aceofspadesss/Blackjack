function symbolGenerator () {
    symbols = ['hearts', 'diamonds', 'clubs', 'spades']

    $(`<img src="./images/${symbols[Math.round(Math.random() * 3)]}.png" class="symbol">`).appendTo('.main-bg').css({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationFillMode: 'forwards',
        animationName: 'going-down',
        animationDuration: '20s',
        animationIterationCount: 'infinite'
    })
}

setInterval(() => {symbolGenerator()}, 2000)

function rollingChips () {
    for (i = 1; i < 7; i++){
        for (c = 0; c < 10; c++){
            $(`<div class="bg-chips${i} bc${c}"></div>`).appendTo(`.col${i}`);
        }
    }
}
rollingChips();

const transition = () => {
    $('.main-menu').css('display', 'none');
    $('.betting').css('display', 'flex');
}

const gameTransition = () => {
    $('.betting').css('display', 'none');
    $('.game-window').css('display', 'block');
}

$('.new-game').click((event) => {
    $('<div class="transition"></div>').css({"left": event.pageX, "top": event.pageY,}).appendTo('.main-menu');
    setTimeout(() => {
        transition();
    }, 1000);
    setTimeout(() => {
        $('.transition').remove()   
    }, 1000)
})

$('.deal').click((event) => {
    $('<div class="transition"></div>').css({left: event.pageX, top: event.pageY, backgroundColor: 'red'}).appendTo('.betting');
    setTimeout(() => {
        gameTransition();
    }, 1000);
    setTimeout(() => {
        $('.transition').remove()   
    }, 1000)
})