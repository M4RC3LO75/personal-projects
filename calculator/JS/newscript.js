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
        // Check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C"){
            // Change operation
            if (this.previousOperationText.innerText !== '') {
                this.changeOperation(operation);
            }
            return;
        }


        // Get current and previous values
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(' ')[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case '+':
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
                case "-":
                    operationValue = previous - current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "*":
                    operationValue = previous * current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "/":
                    operationValue = previous / current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "«":
                    this.processDelOperator();
                    break;
                case "CE":
                    this.processClearCurrentOperator();
                    break;
                case "C":
                    this.processClearOperator();
                    break;
                case "=":
                    this.processEqualOperator();
                    break;
                case "±":
                    this.processInvertOperator();
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

    // Change Math operation
    changeOperation(operation) {
        const mathOperations = ['*', '/', '+', '-'];
        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete a digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Clear current operation
    processClearCurrentOperator() {
        this.currentOperationText.innerText = '';
    }

    // Clear all operations
    processClearOperator() {
        this.currentOperationText.innerText = '';
        this.previousOperationText.innerText = '';
    }

    // Process an operation
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(' ')[1];

        this.processOperation(operation);
    }

    // Invert to positive or negative number
    processInvertOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText * -1;
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