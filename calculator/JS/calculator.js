'use strict ';

const subDisplay = document.getElementById('sub-display')
const mainDisplay = document.getElementById('main-display');
const numbers = document.querySelectorAll('[id*=key]');
const operations = document.querySelectorAll('[id*=operation]');

let newNumber = true;
let newOperation = false;
let operation;
let prevNumber;

const pendingOperation = () => operation != undefined;

const calculate = () => {
    if (pendingOperation()){
        const actualNumber = parseFloat(mainDisplay.textContent.replace(',', '.'));
        newNumber = true;
        const result = eval (`${prevNumber}${operation}${actualNumber}`);
        updateMainDisplay(result);
    }
}

const updateMainDisplay = (text) => {
    if (newNumber || mainDisplay.textContent == 0 ? mainDisplay.textContent = text.toLocaleString('BR') : mainDisplay.textContent += text.toLocaleString('BR'));
    // if (newNumber || mainDisplay.textContent == 0) {
    //     mainDisplay.textContent = text.toLocaleString('BR');
    // } else {
    //     mainDisplay.textContent += text.toLocaleString('BR');
    // }
    newNumber = false;
    newOperation = false;
}

const updateSubDisplay = (text) => {
    if (newOperation) {
        subDisplay.textContent = text.toLocaleString('BR');
    } else {
        subDisplay.textContent += text;
    }
}

const selectOperation = (event) => {
    if (!newNumber) {
        calculate();
        newNumber = true;
        subDisplay.textContent += event.target.textContent;
        operation = event.target.textContent;
        prevNumber = parseFloat(mainDisplay.textContent.replace(',', '.'));
        newOperation = false;
    }
}

const insertNumber = (event) => {
    updateSubDisplay(event.target.textContent);
    updateMainDisplay(event.target.textContent);
}

numbers.forEach (number => number.addEventListener('click', insertNumber));
operations.forEach (operation => operation.addEventListener('click', selectOperation));

const activateEquals = () => {
    calculate();
    operation = undefined;
    newNumber = true;
    newOperation = true;
}
document.getElementById('equals').addEventListener('click', activateEquals)

const clearAllDisplays = () => {
    if (operation == undefined) {
        subDisplay.textContent = '';
    } else if (mainDisplay.textContent.length > 0 && mainDisplay.textContent != 0){
        subDisplay.textContent = subDisplay.textContent.slice(0, -mainDisplay.textContent.length);
    }
    
    mainDisplay.textContent = '0'
    newNumber = true;
}
document.getElementById('clearDisplay').addEventListener('click', clearAllDisplays);

const clearCalc = () => {
    subDisplay.textContent = '';
    mainDisplay.textContent = '0';
    newNumber = true;
    operation = undefined;
    prevNumber = undefined;
    newNumber = true;
} 
document.getElementById('clearCalc').addEventListener('click', clearCalc);

const removeLastNumber = () => {
    if (mainDisplay.textContent.length > 0){
        subDisplay.textContent = subDisplay.textContent.slice(0, -1);
    }
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
}
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    updateMainDisplay (mainDisplay.textContent * -1);
}
document.getElementById('invert').addEventListener('click', invertSignal);

const hasDecimal = () => mainDisplay.textContent.indexOf(',') != -1;
const hasValue = () => mainDisplay.textContent.length > 0 && mainDisplay.textContent != 0 && !newNumber;
const insertDecimal = () => {
    if (!hasDecimal()) {
        if (hasValue()) {
            updateMainDisplay (',');
            updateSubDisplay (',');
        } else {
            updateMainDisplay('0,');
            updateSubDisplay ('0,');
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
    'Enter' : 'equals',
    'c' : 'clearDisplay',
    'Escape' : 'clearCalc',
    'Backspace' : 'backspace',
    ',' : 'decimal',

}

const mapKeyboard = (event) => {
    const key = event.key;
    const validKey = () => Object.keys(keyboardMap).indexOf(key) != -1;
    if (validKey())
    document.getElementById(keyboardMap[key]).click();
}
document.addEventListener('keydown', mapKeyboard)