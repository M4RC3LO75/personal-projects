const uname = document.querySelector('#txtname');
const height = document.querySelector('#txtheight');
const weight = document.querySelector('#txtweight');
const btnCalc = document.querySelector('#btncalc')
const rText = document.querySelector('#resulttext')



btnCalc.addEventListener('click', (e) => {
    e.preventDefault();
    
    const nameValue = uname.value;
    const heightValue = Number(height.value);
    const weightValue = Number(weight.value);
    const imc = weightValue / (heightValue * heightValue);
    
    rText.innerHTML = `Olá, ${nameValue}!<br/> Seu IMC é: ${imc.toFixed(2)} <br/>`

    if (imc < 16) {
        rText.innerHTML += "Magreza Grau 3<br/>Seu peso está abaixo do ideal."
    }
    if (imc >= 16 && imc <= 16.9) {
        rText.innerHTML += "Magreza Grau 2<br/>Seu peso está abaixo do ideal."
    }
    if (imc >= 17 && imc <= 18.4) {
        rText.innerHTML += "Magreza Grau 1<br/>Seu peso está abaixo do ideal."
    }
    if (imc >= 18.4 && imc <= 24.9) {
        rText.innerHTML += "Adequado<br/>Seu peso está dentro do ideal."
    }
    if (imc >= 25 && imc <= 29.9) {
        rText.innerHTML += "Pré-Obeso<br/>Seu peso está acima do ideal."
    }
    if (imc >= 30 && imc <= 34.9) {
        rText.innerHTML += "Obesidade Grau 1<br/>Seu peso está acima do ideal."
    }
    if (imc >= 35 && imc <= 39.9) {
        rText.innerHTML += "Obesidade Grau 2<br/>Seu peso está acima do ideal."
    }
    if (imc > 40) {
        rText.innerHTML += "Obesidade Grau 3<br/>Seu peso está acima do ideal."
    }
})