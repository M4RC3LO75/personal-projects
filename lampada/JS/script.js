const bulb = document.querySelector('#bulb');
const btnSwitch = document.querySelector('#btnswitch');

function switchbtn() {
    if (bulb.classList.contains('active')) {
        btnSwitch.style.backgroundImage="url('./img/switch-off.png')";
        bulb.src ='img/off.jpg';
        bulb.classList.remove('active');
    } else {
        btnSwitch.style.backgroundImage="url('./img/switch-on.png')";
        bulb.src ='img/on.jpg';
        bulb.classList.add('active');
    }
}

btnSwitch.addEventListener('click', switchbtn)