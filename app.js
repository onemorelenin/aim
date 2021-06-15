const startBtn = document.querySelector('#start');
const screns = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#fb0094', '#0000ff', '#00ff00', '#ffff00', '#ff0000', '#fb0094', '#0000ff', '#00ff00', '#ffff00', '#ff0000'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', e => {
    e.preventDefault();
    screns[0].classList.add('up');
});

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screns[1].classList.add('up');  
        startGame();
    }
})

board.addEventListener('click', e => { 
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

function startGame() { 
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() { 
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) { 
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() { 
    timeEl.parentNode.classList.add('hide'); 
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() { 
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 35);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size); 
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`; 
    circle.style.height = `${size}px`; 
    circle.style.top = `${y}px`; 
    circle.style.left = `${x}px`; 
    circle.style.backgroundColor = color;

    board.append(circle); 
}

function getRandomNumber(min, max) { 
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
