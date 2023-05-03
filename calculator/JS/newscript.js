const previousOperationText = document.querySelector('#sub-display');
const currentOperationText = document.querySelector('#main-display');
const buttons = document.querySelectorAll('#calculator-buttons button');

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = '';
    }

    // Add digit to calculator screen
    addDigit(digit) {
        // Check if current operation already has a dot
        if (digit === '.' && currentOperationText.innerText.includes('.')) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculation operations
    processOperation(operation) {
        // Get current and previous values
        let operationValue;
        let previous = +this.previousOperationText.innerText;
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case '+':
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            default:
                return;
        }
    }

    // Change values of the calulator screen
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {

        if (operationValue === null) {
            // Append number to current value
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current;
            }
            //Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = '';
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === '.') {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});