(function () {
  /* "global" variables */
  let currentOperator = null;
  let needToCleanCurrentDisplay = false;
  let firstOperand = null;
  let secondOperand = null;
  let justCalculated = false;
  let resetNumberDisplay = true;

  /* elements */
  const currentDisplay = document.querySelector('.display .current-display');
  const calculationDisplay = document.querySelector('.display .calculation-display');
  const numberButtons = document.querySelectorAll('.calc-buttons .num-button');
  const clearButton = document.querySelector('.calc-buttons .clear');
  const operatorButtons = document.querySelectorAll('.calc-buttons .operator');
  const equalButton = document.querySelector('.calc-buttons .equal-button'); 

  const operators = {
    '+': (a, b) => Number(a) + Number(b), // to avoid a + b = 'ab'
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '/': (a, b) => a / b,
  }

  /* event listener functions */
  function operate(var1, operator, var2) {
    return operators[operator](var1, var2);
  }

  function addNumberToDisplay() {
    let numberToAdd = this.textContent;

    if (justCalculated && resetNumberDisplay) {
      justCalculated = false;
      clearEverything();
    }
    if (justCalculated) justCalculated = false;

    if (needToCleanCurrentDisplay) cleanCurrentDisplay();
    
    if (currentDisplay.textContent === '0' || currentDisplay.textContent === 'ERROR') currentDisplay.textContent = numberToAdd;
    else currentDisplay.textContent += numberToAdd;
    
    if (currentOperator) secondOperand = currentDisplay.textContent;
  }

  function addOperatorToDisplay() {
    if (currentOperator && !justCalculated) {
      currentOperator = this.textContent;
      checkCalculable(true);
      return;
    };
    if (justCalculated) justCalculated = false;
    currentOperator = this.textContent;
    updateCalculationDisplay(false);
    needToCleanCurrentDisplay = true;
    firstOperand = currentDisplay.textContent;
  }

  function clearEverything() {
    currentDisplay.textContent = '0';
    calculationDisplay.textContent = '';
    currentOperator = firstOperand = secondOperand = null;
    
  }

  function checkCalculable(e) {
    if (secondOperand == 0 && currentOperator === '/') {
      clearEverything();
      currentDisplay.textContent = 'ERROR';
    }
    if (currentOperator && secondOperand) {
      let calculatedValue = operate(firstOperand, currentOperator, secondOperand);
      currentDisplay.textContent = calculatedValue;
      needToCleanCurrentDisplay = true;
      justCalculated = true;
      updateCalculationDisplay(true);
      firstOperand = calculatedValue;
    } 

    resetNumberDisplay = e === true ? false : true; 
  }

  /* Helper functions */
  function updateCalculationDisplay(justCalculated) {
    if (justCalculated) {
      calculationDisplay.textContent = firstOperand + " " + currentOperator + " " + secondOperand + " =";
      justCalculated = false;
    }
    else {
      calculationDisplay.textContent = currentDisplay.textContent + " " + currentOperator;
    }
  }

  function cleanCurrentDisplay() {
    currentDisplay.textContent = '';
    needToCleanCurrentDisplay = false;
  }

  /* event listeners */
  numberButtons.forEach(button => button.addEventListener('click', addNumberToDisplay));
  operatorButtons.forEach(button => button.addEventListener('click', addOperatorToDisplay));

  clearButton.addEventListener('click', clearEverything);
  equalButton.addEventListener('click', checkCalculable)

})()