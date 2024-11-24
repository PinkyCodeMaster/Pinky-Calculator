// Get the display element
const display = document.getElementById("user-input");

// Variables to store input and calculation state
let currentInput = "";
let previousInput = "";
let operator = null;

// Function to update the display
function updateDisplay(value) {
    display.textContent = value || "0";
}

// Event listener for button clicks
document.querySelector(".calc-keys").addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;

    const buttonValue = e.target.textContent;
    const buttonClass = e.target.classList;

    handleInput(buttonValue, buttonClass.contains("operations"), buttonClass.contains("numbers"));
});

// Event listener for keyboard input
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || key === ".") {
        // Handle numbers and decimal point
        handleInput(key, false, true);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
        // Handle operations
        handleInput(key, true, false);
    } else if (key === "Enter" || key === "=") {
        // Handle equals
        handleInput("=", true, false);
    } else if (key === "Backspace") {
        // Handle delete
        handleInput("DEL", false, false);
    } else if (key === "Escape") {
        // Handle clear (AC)
        handleInput("AC", false, false);
    }
});

// Function to handle inputs
function handleInput(value, isOperation, isNumber) {
    if (value === "AC") {
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay("0");
        return;
    }

    if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
        return;
    }

    if (isOperation) {
        if (["+", "-", "*", "/", "%"].includes(value)) {
            if (currentInput) {
                if (previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator).toString();
                }
                previousInput = currentInput;
                currentInput = "";
            }
            operator = value;
        } else if (value === "=") {
            if (previousInput && operator && currentInput) {
                currentInput = calculate(previousInput, currentInput, operator).toString();
                previousInput = "";
                operator = null;
            }
        }
        updateDisplay(currentInput || previousInput);
        return;
    }

    if (isNumber) {
        if (value === "." && currentInput.includes(".")) return;
        currentInput += value;
        updateDisplay(currentInput);
    }
}

// Function to calculate the result
function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? "Error" : a / b;
        case "%": return a % b;
        default: return b;
    }
}
