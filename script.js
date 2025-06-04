let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let waitingForSecond = false;

const display = document.getElementById("display");
const numberButtons = [
  document.getElementById("btn0"),
  document.getElementById("btn1"),
  document.getElementById("btn2"),
  document.getElementById("btn3"),
  document.getElementById("btn4"),
  document.getElementById("btn5"),
  document.getElementById("btn6"),
  document.getElementById("btn7"),
  document.getElementById("btn8"),
  document.getElementById("btn9"),
];
const btnAdd = document.getElementById("btnAdd");
const btnSubtract = document.getElementById("btnSubtract");
const btnMultiply = document.getElementById("btnMultiply");
const btnDivide = document.getElementById("btnDivide");
const btnEquals = document.getElementById("btnEquals");
const btnClear = document.getElementById("btnClear");

function clearAll() {
  firstOperand = null;
  secondOperand = null;
  currentOperation = null;
  waitingForSecond = false;
  display.value = "";
}

function appendNumber(digit) {
  if (waitingForSecond) {
    display.value = "";
    waitingForSecond = false;
  }
  if (display.value === "0") {
    display.value = digit.toString();
  } else {
    display.value += digit.toString();
  }
}

function chooseOperation(operation) {
  if (display.value === "") return;

  if (currentOperation !== null && !waitingForSecond) {
    computeResult();
  }

  firstOperand = parseFloat(display.value);
  currentOperation = operation;
  waitingForSecond = true;

  display.value = operation;
}

function computeResult() {
  if (currentOperation === null || display.value === "") return;

  if (waitingForSecond) {
    secondOperand = firstOperand;
  } else {
    secondOperand = parseFloat(display.value);
  }

  let result;
  switch (currentOperation) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "−":
      result = firstOperand - secondOperand;
      break;
    case "×":
      result = firstOperand * secondOperand;
      break;
    case "÷":
      if (secondOperand === 0) {
        alert("Error: División por cero");
        clearAll();
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  display.value = result.toString();
  firstOperand = result;
  secondOperand = null;
  currentOperation = null;
  waitingForSecond = false;
}

numberButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    appendNumber(index);
  });
});

btnAdd.addEventListener("click", () => chooseOperation("+"));
btnSubtract.addEventListener("click", () => chooseOperation("−"));
btnMultiply.addEventListener("click", () => chooseOperation("×"));
btnDivide.addEventListener("click", () => chooseOperation("÷"));

btnEquals.addEventListener("click", () => {
  computeResult();
});

btnClear.addEventListener("click", () => {
  clearAll();
});

clearAll();
