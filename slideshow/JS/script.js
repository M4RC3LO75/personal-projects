'use strict';

const images = [ 
    {'id': '1', 'url':'./img/tomb-raider.png', 'title': `Tomb Raider`},
    {'id': '2', 'url':'./img/gta-v.jpg', 'title': `GTA V`},
    {'id': '3', 'url':'./img/god-of-war-ragnarok.jpg', 'title': `God of War - Ragnarok`},
    {'id': '4', 'url':'./img/far-cry-6.jpg', 'title': `Far Cry 6`},
    {'id': '5', 'url':'./img/donkey-kong-country.jpg', 'title': `Donkey Kong - Country`},
    {'id': '6', 'url':'./img/resident-evil-6.jpg', 'title': `Resident Evil 6`},
    {'id': '7', 'url':'./img/zelda-oot.jpg', 'title': `Zelda - Ocarina of Time`},
    {'id': '8', 'url':'./img/super-mario-64.jpg', 'title': `Super Mario 64`, 'button': 'GTA'},
]

const containerItems = document.querySelector('#container-items');


const loadImages = (images, container) => {
    images.forEach (image => {
        container.innerHTML += `<div class='item'><img src= '${image.url}'><p>${image.title}</p></div>
        `
    })
}

loadImages (images, containerItems);

let items = document.querySelectorAll('.item');

const previous = () => {
    const lastItem = items[items.length - 1];
    containerItems.insertBefore( lastItem, items[0]);
    items = document.querySelectorAll('.item');
}

const next = () => {
    containerItems.appendChild(items[0]);
    items = document.querySelectorAll('.item');
}

document.querySelector('#previous').addEventListener('click', previous);
document.querySelector('#next').addEventListener('click', next);