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