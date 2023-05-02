'use strict ';

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=key]');
const operations = document.querySelectorAll('[id*=operation]');

let newNumber = true;
let operation;
let prevNumber;

const pendingOperation = () => operation != undefined;

const calculate = () => {
    if (pendingOperation()){
        const actualNumber = parseFloat(display.textContent.replace(',', '.'));
        newNumber = true;
        const result = eval (`${prevNumber}${operation}${actualNumber}`);
        updateDisplay(result);
    }
}

const updateDisplay = (text) => {
    if (newNumber ? display.textContent = text.toLocaleString('BR') : display.textContent += text);
    newNumber = false;
}

const selectOperation = (event) => {
    if (!newNumber) {
        calculate();
        newNumber = true;
        operation = event.target.textContent;
        prevNumber = parseFloat(display.textContent.replace(',', '.'));
    }
    
}

const insertNumber = (event) => updateDisplay(event.target.textContent);

numbers.forEach (number => number.addEventListener('click', insertNumber));
operations.forEach (operation => operation.addEventListener('click', selectOperation));

const activateEquals = () => {
    calculate();
    operation = undefined;
    newNumber = true;
}
document.getElementById('equals').addEventListener('click', activateEquals)

const clearDisplay = () => {
    display.textContent = ''
    newNumber = true;
}
document.getElementById('clearDisplay').addEventListener('click', clearDisplay);

const clearCalc = () => {
    clearDisplay();
    operation = undefined;
    prevNumber = undefined;
    newNumber = true;
} 
document.getElementById('clearCalc').addEventListener('click', clearCalc);

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    updateDisplay (display.textContent * -1);
}
document.getElementById('invert').addEventListener('click', invertSignal);

const hasDecimal = () => display.textContent.indexOf(',') != -1;
const hasValue = () => display.textContent.length > 0;
const insertDecimal = () => {
    if (!hasDecimal()) {
        if (hasValue()) {
            updateDisplay (',');
        } else {
            updateDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal);

const keyboardMap = {
    '0' : 'key0',
    '1' : 'key1',
    '2' : 'key2',
    '3' : 'key3',
    '4' : 'key4',
    '5' : 'key5',
    '6' : 'key6',
    '7' : 'key7',
    '8' : 'key8',
    '9' : 'key9',
    '+' : 'operationAdd',
    '-' : 'operationSubtract',
    '*' : 'operationMultiply',
    '/' : 'operationDivide',
    '=' : 'equals',
    'enter' : 'equals',
}

const mapKeyboard = (event) => {
    const key = event.key;
    document.getElementById(keyboardMap[key]).click();
}
document.addEventListener('keydown', mapKeyboard)