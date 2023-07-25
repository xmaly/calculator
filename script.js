const buttons = document.querySelectorAll('.buttons div');
const displayValue = document.querySelector('.current-value');
const historyValue = document.querySelector('.history-value');

let firstNumber;
let secondNumber;
let operator = '';
let cache = 0;

function clear() {
    firstNumber = 0;
    secondNumber = 0;
    operator = '';
    displayValue.textContent = '';
    historyValue.textContent = '';
    cache = 0;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operators')) {
            handleOperatorClick(button);
        } else if (button.classList.contains('numbers')) {
            displayValue.textContent += button.textContent;
            cache += button.textContent;
        } else {
            switch (button.id) {
                case 'clear':
                    clear();
                    break;
                case 'equals':
                    operate(button.textContent);
                    break;
                case 'negate':
                    negate();
                    break;         
            }
        }
    });
});

function handleOperatorClick(button) {
    if (!firstNumber) {
        firstNumber = parseInt(cache);
    } else {
        secondNumber = parseInt(cache);
        operate(button.textContent);
    }
    displayValue.textContent += button.textContent;
    operator = button.id;
    cache = 0;
}

function negate() {
    cache *= -1;
    displayValue.textContent *= -1;
}

function operate() {
    secondNumber = parseInt(cache);
    historyValue.textContent = displayValue.textContent;

    let result = 0;
    switch (operator) {
        case 'add':
            result = firstNumber + secondNumber;
            break;
        case 'sub':
            result = firstNumber - secondNumber;
            break;
        case 'multiply':
            result = firstNumber * secondNumber;
            break;
        case 'divide':
            result = (firstNumber / secondNumber).toFixed(2);
            break;
        default:
            result = 'Non-existing operator';
            return;
    }
    firstNumber = result;
    cache = 0;
    displayValue.textContent = result;
}