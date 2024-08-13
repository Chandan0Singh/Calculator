// Select elements from the DOM
const buttons = document.querySelectorAll('.button');
const equationElement = document.querySelector('.equation');
const resultElement = document.querySelector('.result');

// Initialize variables
let equation = '';
let resultDisplayed = false;

// Function to update the display
function updateDisplay() {
    equationElement.textContent = equation || '0';
    if (resultDisplayed) {
        resultElement.textContent = equation || '0';
    } else {
        try {
            const result = eval(equation.replace(/x/g, '*').replace(/÷/g, '/'));
            resultElement.textContent = result !== undefined ? result : '0';
        } catch (e) {
            resultElement.textContent = 'Error';
        }
    }
}

// Function to handle button clicks
function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if (buttonValue === 'AC') {
        equation = '';
        resultDisplayed = false;
    } else if (buttonValue === 'C') {
        equation = equation.slice(0, -1);
    } else if (buttonValue === '=') {
        try {
            equation = eval(equation.replace(/x/g, '*').replace(/÷/g, '/')).toString();
            resultDisplayed = true;
        } catch (e) {
            equation = '';
            resultElement.textContent = 'Error';
        }
    } else if (buttonValue === '%') {
        if (equation) {
            equation = (parseFloat(equation) / 100).toString();
            resultDisplayed = true;
        }
    } else {
        if (resultDisplayed) {
            equation = buttonValue.match(/[0-9.]/) ? buttonValue : '';
            resultDisplayed = false;
        } else {
            equation += buttonValue;
        }
    }

    updateDisplay();
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Initialize display on page load
updateDisplay();
