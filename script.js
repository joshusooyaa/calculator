(function () {
  /* "global" variables */
  let displayContent = '';
  let currentOperator = null;
  let needToCleanCurrentDisplay = false;
  let firstOperand = null;

  /* elements */
  const currentDisplay = document.querySelector('.display .current-display');
  const calculationDisplay = document.querySelector('.display .calculation-display');
  const numberButtons = document.querySelectorAll('.calc-buttons .num-button');
  const clearButton = document.querySelector('.calc-buttons .clear');
  const operatorButtons = document.querySelectorAll('.calc-buttons .operator');


  const operators = {
    '+': (a, b) => Number(a) + Number(b), // to avoid a + b = 'ab'
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  }

  /* event listener functions */
  function operate(var1, operator, var2) {
    return operators[operator](var1, var2);
  }

  function addNumberToDisplay() {
    let numberToAdd = this.textContent;
    if (needToCleanCurrentDisplay) cleanCurrentDisplay();
    if (currentDisplay.textContent === '0') currentDisplay.textContent = numberToAdd;
    else currentDisplay.textContent += numberToAdd;
    displayContent = currentDisplay.textContent;
  }

  function addOperatorToDisplay() {
    if (currentOperator) return;

    currentOperator = this.textContent;
    updateCalculationDisplay();
    needToCleanCurrentDisplay = true;
    firstOperand = currentDisplay.textContent;
  }

  function clearEverything() {
    currentDisplay.textContent = '0';
    calculationDisplay.textContent = '';
    displayContent = '';
    currentOperator = null;
  }

  /* Helper functions */
  function updateCalculationDisplay() {
    calculationDisplay.textContent = currentDisplay.textContent + " " + currentOperator;
  }

  function cleanCurrentDisplay() {
    currentDisplay.textContent = '';
    needToCleanCurrentDisplay = false;
  }

  /* event listeners */
  numberButtons.forEach(button => button.addEventListener('click', addNumberToDisplay));
  operatorButtons.forEach(button => button.addEventListener('click', addOperatorToDisplay));

  clearButton.addEventListener('click', clearEverything);

})()