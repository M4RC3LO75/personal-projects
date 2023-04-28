const bulb = document.querySelector('#bulb');
const btnSwitch = document.querySelector('#btnswitch');
const msg = document.querySelector('#message')

function breakbulb(){
    if (bulb.classList.contains('broken')) {
        msg.style.background = 'red';
        msg.innerHTML = `A lâmpada está quebrada! </br>Clique aqui para restaurar.`
    } else {
        var bodyBg = document.querySelector('#body');
        bulb.src = 'img/broken.jpg';
        bulb.classList.add('broken');
        btnSwitch.style.backgroundImage="url('./img/switch-off.png')";
        bodyBg.style.background = 'linear-gradient(to top, black, #150886) fixed';
        msg.innerHTML = `A Lâmpada quebrou!</br>Tente ligá-la novamente`;
    }
}

function switchbtn() {
    if (bulb.classList.contains('broken')) { 
        msg.style.background = 'red';
        msg.innerHTML = `A lâmpada está quebrada! </br>Clique aqui para restaurar.`
        msg.style.cursor = 'pointer';
    } else {
        var bodyBg = document.querySelector('#body');
        if (bulb.classList.contains('active')) {
            btnSwitch.style.backgroundImage="url('./img/switch-off.png')";
            bulb.src ='img/off.jpg';
            bulb.classList.remove('active');
            bodyBg.style.background = 'linear-gradient(to top, black, #150886) fixed';
        } else {
            btnSwitch.style.backgroundImage="url('./img/switch-on.png')";
            bulb.src ='img/on.jpg';
            bulb.classList.add('active');
            bodyBg.style.background = 'linear-gradient(to top, black, #dac82a) fixed';
        }
    }
}

function reset() {
    if (msg.style.background == 'red') {
        bulb.src ='img/off.jpg';
        bulb.classList.remove('broken');
        msg.style.background = '#0f0f66';
        msg.innerHTML = 'Experimente dar duplo clique na lâmpada';
        msg.style.cursor = 'text';
    }
}

bulb.addEventListener('dblclick', breakbulb);

btnSwitch.addEventListener('click', switchbtn);

msg.addEventListener('click', reset);