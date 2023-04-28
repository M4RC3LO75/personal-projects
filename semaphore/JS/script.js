const trafficLight = document.querySelector('#trafficlight')
const buttons = document.querySelector('#buttons')
let colorIndex = 0;

const tlChange = (event) => {
    turnOn[event.target.id]();
}

const nextIndex = () => {
    colorIndex = colorIndex < 2 ? ++colorIndex : 0;
}

const changeLight = () => {
    const btncolors = ['btnred', 'btnyellow', 'btngreen'];
    const color = btncolors[colorIndex];
    turnOn[color]();
    nextIndex();
}

const turnOn = {
    'btnred':       () => trafficLight.src = './img/red.png',
    'btnyellow':    () => trafficLight.src = './img/yellow.png',
    'btngreen':     () => trafficLight.src = './img/green.png',
    'btnautomatic':    () => setInterval (changeLight, 1000)
}


buttons.addEventListener('click', tlChange)