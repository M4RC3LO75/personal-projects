'use strict';

const images = [ 
    {'id': '1', 'url':'./img/tomb-raider.png'},
    {'id': '2', 'url':'./img/gta-v.jpg'},
    {'id': '3', 'url':'./img/god-of-war-ragnarok.jpg'},
    {'id': '4', 'url':'./img/far-cry-6.jpg'},
    {'id': '5', 'url':'./img/donkey-kong-country.jpg'},
    {'id': '6', 'url':'./img/resident-evil-6.jpg'},
    {'id': '7', 'url':'./img/zelda-oot.jpg'},
    {'id': '8', 'url':'./img/super-mario-64.jpg'},
]

const containerItems = document.querySelector('#container-items');


const loadImages = (images, container) => {
    images.forEach (image => {
        container.innerHTML += `
            <div class='item'>
                <img src= '${image.url}'
            </div>
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