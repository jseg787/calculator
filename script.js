const screen = document.querySelector("#screen");
const numbers = document.querySelectorAll(".num");
const resetButton = document.querySelector("#reset");
const equalButton = document.querySelector("#equals");
const operations = document.querySelectorAll(".operation");

let error = false;
let operating = false;
let isOperationComplete = false;
let numOnScreenChanged = false;
let operation = "";
let num1 = "";
let num2 = "";

numbers.forEach((el) => el.addEventListener("click", putNumberOnScreen));
resetButton.addEventListener("click", reset);
equalButton.addEventListener("click", function () {
  if (operating) {
    num2 = num2 || screen.textContent;
    const result = operate(operation, Number(num1), Number(num2));
    screen.textContent = result;
    num1 = screen.textContent;
    isOperationComplete = true;
  }
});
operations.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (!error) {
      if (operating) {
        num2 = num2 || screen.textContent;
        const result = operate(operation, Number(num1), Number(num2));
        screen.textContent = result;
      }
      operation = e.target.innerText;
      num1 = screen.textContent;
      num2 = "";
      operating = true;
      isOperationComplete = false;
      numOnScreenChanged = false;
    }
  });
});

reset();

function putNumberOnScreen(e) {
  if (screen.innerText.length > 9 || error) {
    return;
  }

  if (isOperationComplete) {
    reset();
  }

  const numberPressed = e.target.innerText;
  let numberOnScreen = screen.innerText;

  // if the number on the screen is 0 and the number pressed is 0 do nothing
  if ((numberOnScreen === "0") & (numberPressed === "0")) {
    return;
  }

  if (!num1) {
    if (numberOnScreen === "0") {
      screen.innerText = numberPressed;
    } else {
      screen.innerText += numberPressed;
    }
  } else if (!num2) {
    if (!numOnScreenChanged) {
      screen.innerText = numberPressed;
      numOnScreenChanged = true;
    } else {
      screen.innerText += numberPressed;
    }
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    error = true;
    return "ERROR";
  } else {
    return num1 / num2;
  }
}

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  }
  if (operator === "-") {
    return subtract(num1, num2);
  }
  if (operator === "*") {
    return multiply(num1, num2);
  }
  if (operator === "/") {
    return divide(num1, num2);
  }
}

function reset() {
  screen.innerText = 0;
  operating = false;
  error = false;
  operation = "";
  num1 = "";
  num2 = "";
  isOperationComplete = false;
}
