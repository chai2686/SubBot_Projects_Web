const screen = document.querySelector(".screen");
const keys = document.querySelector(".keys");
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;

keys.addEventListener("click", function (event) {
  if (event.target.matches(".key")) {
    const key = event.target;
    const keyValue = key.textContent;

    if (keyValue === "C") {
      clearScreen();
    } else if (
      keyValue === "+" ||
      keyValue === "-" ||
      keyValue === "*" ||
      keyValue === "/"
    ) {
      handleOperator(keyValue);
    } else if (keyValue === ".") {
      handleDecimal();
    } else if (keyValue === "=") {
      handleEquals();
    } else {
      handleNumber(keyValue);
    }
  }
});

function handleNumber(number) {
  if (operator === null) {
    operand1 = appendDigit(operand1, number);
    updateScreen(operand1);
  } else {
    operand2 = appendDigit(operand2, number);
    updateScreen(operand2);
  }
}

function handleOperator(op) {
  operator = op;
}

function handleDecimal() {
  if (operator === null) {
    operand1 = appendDecimal(operand1);
    updateScreen(operand1);
  } else {
    operand2 = appendDecimal(operand2);
    updateScreen(operand2);
  }
}

function handleEquals() {
  if (operand1 !== null && operand2 !== null && operator !== null) {
    result = operate(operator, operand1, operand2);
    updateScreen(result);
    clearOperands();
  }
}

function operate(op, a, b) {
  switch (op) {
    case "+":
      return parseFloat(a) + parseFloat(b);
    case "-":
      return parseFloat(a) - parseFloat(b);
    case "*":
      return parseFloat(a) * parseFloat(b);
    case "/":
      return parseFloat(a) / parseFloat(b);
    default:
      return null;
  }
}

function appendDigit(operand, digit) {
  if (operand === null) {
    return digit;
  } else {
    return operand + digit;
  }
}

function appendDecimal(operand) {
  if (operand === null) {
    return "0.";
  } else if (!operand.includes(".")) {
    return operand + ".";
  } else {
    return operand;
  }
}

function clearScreen() {
  screen.value = "";
  clearOperands();
}

function clearOperands() {
  operand1 = null;
  operand2 = null;
  operator = null;
  result = null;
}

function updateScreen(value) {
  screen.value = value;
}
