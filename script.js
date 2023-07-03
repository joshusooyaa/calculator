(function () {
  /* "global" variables */
  let currentOperator = null;
  let needToCleanCurrentDisplay = false;
  let firstOperand = null;
  let secondOperand = null;
  let justCalculated = false;
  let resetNumberDisplay = true;
  let decimalInNumber = false;

  /* elements */
  const currentDisplay = document.querySelector('.display .current-display');
  const calculationDisplay = document.querySelector('.display .calculation-display');
  const numberButtons = document.querySelectorAll('.calc-buttons .num-button');
  const clearButton = document.querySelector('.calc-buttons .clear');
  const operatorButtons = document.querySelectorAll('.calc-buttons .operator');
  const equalButton = document.querySelector('.calc-buttons .equal-button'); 
  const decimalButton = document.querySelector('.calc-buttons .decimal');

  calculationDisplayTextSize = window.getComputedStyle(calculationDisplay).fontSize;

  const operators = {
    '+': (a, b) => Number(a) + Number(b), // to avoid a + b = 'ab'
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '/': (a, b) => a / b,
  }

  /* callback functions */
  function operate(var1, operator, var2) {
    result = operators[operator](var1, var2);
    return parseFloat(result.toFixed(5));
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
    decimalInNumber = false;
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
    decimalInNumber = false;
    currentDisplay.style.fontSize = window.getComputedStyle(currentDisplay).fontSize;
    calculationDisplay.style.fontSize = window.getComputedStyle(calculationDisplay).fontSize;
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
      decimalInNumber = false;
    } 

    // Checking if e is an event or not
    resetNumberDisplay = (e === true) ? false : true; 
  }

  function addDecimal() {
    if (justCalculated && resetNumberDisplay) {
      justCalculated = false;
      clearEverything();
    }

    if (decimalInNumber) return;

    if (needToCleanCurrentDisplay) cleanCurrentDisplay('0');
    
    currentDisplay.textContent += '.'
    decimalInNumber = true;
  }

  function checkDisplayContentSize(mutationList) {
    for (const mutation of mutationList) {
      let currentNode = mutation.target;
      let parentNode = currentNode.parentNode;
      if (currentNode.clientWidth < parentNode.clientWidth) {
        currentNode.style.fontSize = 
              currentNode.className === 'current-display'? '7.5vh' : "2.2vh";
      }
      while (currentNode.clientWidth > parentNode.clientWidth) {
        let currentFontSize = parseFloat(window.getComputedStyle(currentNode).fontSize);
        currentNode.style.fontSize = (currentFontSize - 1) + "px";
      }
    }
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

  function cleanCurrentDisplay(clearWith='') {
    currentDisplay.textContent = clearWith;
    needToCleanCurrentDisplay = false;
    currentDisplay.style.fontSize = window.getComputedStyle(currentDisplay).fontSize;;
  }

  /* event listeners */
  numberButtons.forEach(button => button.addEventListener('click', addNumberToDisplay));
  operatorButtons.forEach(button => button.addEventListener('click', addOperatorToDisplay));

  clearButton.addEventListener('click', clearEverything);
  equalButton.addEventListener('click', checkCalculable)
  decimalButton.addEventListener('click', addDecimal);
  
  // Mutation Observer for when large number in calculator
  const observer = new MutationObserver(checkDisplayContentSize)
  var config = {childList: true, characterData: true, subtree: true};
  observer.observe(currentDisplay, config);
  observer.observe(calculationDisplay, config);
  

})()