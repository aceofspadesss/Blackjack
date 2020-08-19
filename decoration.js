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

// function rollingChips () {
//     let horizontalPosition = 0;
//     for (i = 0; i < 3; i++){
//         $('<img src="./images/chip.png" class="rolling-chip1">').appendTo('.bg-chip').css({left: `${horizontalPosition}px`});
//         $('<img src="./images/chip.png" class="rolling-chip2">').appendTo('.bg-chip').css({left: `${horizontalPosition + 200}px`});
//         horizontalPosition = horizontalPosition + 400;
//     }
    
// }
// rollingChips()

function rollingChips () {
    for (i = 1; i < 7; i++){
        for (c = 0; c < 10; c++){
            $(`<div class="bg-chips${i} bc${c}"></div>`).appendTo(`.col${i}`);
        }
    }
    // for (c = 0; c < 6; c++){
    //     $(`<div class="bg-chips1 bc${i}"></div>`)
    // }
}
rollingChips();