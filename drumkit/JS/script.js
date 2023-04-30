'use strict';

const sounds = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav',
}

const createDiv = (text) => {
    const div = document.createElement('div');
    div.classList.add('key');
    div.id = text;
    div.textContent = text;
    document.getElementById('container').appendChild(div);
}

const show = (sounds) => Object.keys(sounds).forEach(createDiv);

const playSound = (keystring) => {
    const audio = new Audio(`./sounds/${sounds[keystring]}`);
    audio.play();
}

const addEffect = (keystring) => document.getElementById(keystring).classList.add('active');
const removeEffect = (keystring) =>{
    const div = document.getElementById(keystring);
    const removeActive = () => div.classList.remove('active');
    div.addEventListener('transitionend', removeActive);
}
const activateDiv = (event) => {
    let keystring = '';
    // if (event.type == 'click') {
    //     keystring = event.target.id;
    // } else {
    //     keystring = event.key.toUpperCase();
    // }

    keystring = event.type == 'click'? event.target.id : event.key.toUpperCase();

    const keystringValid = sounds.hasOwnProperty(keystring);
    if (keystringValid){
        addEffect(keystring);
        playSound(keystring); 
        removeEffect(keystring);
    }
    
}

show(sounds);
document.getElementById('container').addEventListener('click', activateDiv);
window.addEventListener ('keydown', activateDiv)