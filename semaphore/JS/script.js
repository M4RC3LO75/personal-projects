const trafficLight = document.querySelector('#trafficlight')
const buttons = document.querySelector('#buttons')
let colorIndex = 2;
let intervalId = null;

const tlChange = (event) => {
    stopAutomatic();
    turnOn[event.target.id]();
}

const nextIndex = () => {
    colorIndex = colorIndex > 0 ? --colorIndex : 2;
}

const changeLight = () => {
    const btncolors = ['btnred', 'btnyellow', 'btngreen'];
    const color = btncolors[colorIndex];
    turnOn[color]();
    nextIndex();
}

const stopAutomatic = () => {
    clearInterval(intervalId);
}

const turnOn = {
    'btnred':       () => trafficLight.src = './img/red.png',
    'btnyellow':    () => trafficLight.src = './img/yellow.png',
    'btngreen':     () => trafficLight.src = './img/green.png',
    'btnautomatic':    () => intervalId = setInterval (changeLight, 1000)
}


buttons.addEventListener('click', tlChange)
