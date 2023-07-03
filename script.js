(function () {
  /* "global" variables */
  let currentOperator = null;
  let justUpdatedOperator = false;
  let needToCleanCurrentDisplay = false;
  let firstOperand = null;
  let secondOperand = null;
  let justCalculated = false;
  let resetNumberDisplay = true;
  let decimalInNumber = false;
  let canErase = true;
  let previousOperator = null;

  /* elements */
  const currentDisplay = document.querySelector('.display .current-display');
  const calculationDisplay = document.querySelector('.display .calculation-display');
  const numberButtons = document.querySelectorAll('.calc-buttons .num-button');
  const clearButton = document.querySelector('.calc-buttons .clear');
  const operatorButtons = document.querySelectorAll('.calc-buttons .operator');
  const equalButton = document.querySelector('.calc-buttons .equal-button'); 
  const decimalButton = document.querySelector('.calc-buttons .decimal');
  const negateButton = document.querySelector('.calc-buttons .negate');
  const eraseButton = document.querySelector('.erase');

  const operators = {
    '+': (a, b) => Number(a) + Number(b), // to avoid a + b = 'ab'
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
  }

  /* callback functions */
  function operate(var1, operator, var2) {
    result = operators[operator](var1, var2);
    return parseFloat(result.toFixed(5));
  }

  function addNumberToDisplay() {
    if (currentDisplay.textContent.length > 25 && !justUpdatedOperator) return;
    
    let numberToAdd = this.textContent;
    canErase = true;
    justUpdatedOperator = false;

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
    if (currentDisplay.textContent === 'ERROR') {
      clearEverything();
      return;
    }
    if (currentOperator && !justCalculated) {
      currentOperator = this.textContent;
      if (currentOperator == previousOperator) {
        justUpdatedOperator = true;
        checkCalculable(true);
        return;
      }
      else {
        previousOperator = currentOperator;
      }
    };
    if (justCalculated) justCalculated = false;
    currentOperator = this.textContent;
    previousOperator = currentOperator;
    justUpdatedOperator = true;
    updateCalculationDisplay(false);
    needToCleanCurrentDisplay = true;
    firstOperand = currentDisplay.textContent;
  }

  function clearEverything() {
    currentDisplay.textContent = '0';
    calculationDisplay.textContent = '';
    currentOperator = firstOperand = secondOperand = previousOperator= null;
    decimalInNumber = justUpdatedOperator = false;
    currentDisplay.style.fontSize = window.getComputedStyle(currentDisplay).fontSize;
    calculationDisplay.style.fontSize = window.getComputedStyle(calculationDisplay).fontSize;
  }

  function checkCalculable(e) {
    if (secondOperand == 0 && currentOperator === '÷') {
      clearEverything();
      currentDisplay.textContent = 'ERROR';
      resetNumberDisplay = (e === true) ? false : true; 
      return;
    }
    if (currentOperator && secondOperand) calculateValue(firstOperand, currentOperator, secondOperand);
    else if (currentOperator) calculateValue(firstOperand, currentOperator, currentDisplay.textContent);
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

  function negateNumber() {
    let displayContent = currentDisplay.textContent;
    
    if (displayContent.includes('-')) {
      currentDisplay.textContent = displayContent.replace('-', '');
      if (secondOperand) secondOperand = currentDisplay.textContent;
      else firstOperand = currentDisplay.textContent;
    }
    else if (displayContent !== '0' && displayContent !== '0.') {
      currentDisplay.textContent = `-${currentDisplay.textContent}`;
    }
  }

  function erasePreviousInput() {
    let displayContent = currentDisplay.textContent;
    if (displayContent == "ERROR") clearEverything();
    else if (justUpdatedOperator) {
      currentOperator = previousOperator = null;
      justUpdatedOperator = false;
      canErase = false;
      calculationDisplay.textContent = calculationDisplay.textContent.slice(0,-1);
    }
    else if (displayContent !== '0' && !justCalculated && canErase) {
      if (displayContent.length == 1) {
        currentDisplay.textContent = '0';
        if (secondOperand) secondOperand = '0';
      }
      else {
        currentDisplay.textContent = displayContent.slice(0, -1);
      }
      if (!currentDisplay.textContent.includes('.')) decimalInNumber = false;
    }
  }

  function checkDisplayContentSize(mutationList) {
    for (const mutation of mutationList) {
      let currentNode = mutation.target;
      let parentNode = currentNode.parentNode;
      if (currentNode.clientWidth < parentNode.clientWidth) {
        currentNode.style.removeProperty('font-size')
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

  function calculateValue(first, op, second) {
    let calculatedValue = operate(first, op, second);
    currentDisplay.textContent = calculatedValue;
    needToCleanCurrentDisplay = true;
    justCalculated = true;
    justUpdatedOperator = false;
    if (secondOperand == null) secondOperand = second;
    updateCalculationDisplay(true);
    firstOperand = calculatedValue;
    decimalInNumber = false;
  }

  /* event listeners */
  numberButtons.forEach(button => button.addEventListener('click', addNumberToDisplay));
  operatorButtons.forEach(button => button.addEventListener('click', addOperatorToDisplay));

  clearButton.addEventListener('click', clearEverything);
  equalButton.addEventListener('click', checkCalculable)
  decimalButton.addEventListener('click', addDecimal);
  negateButton.addEventListener('click', negateNumber);
  eraseButton.addEventListener('click', erasePreviousInput);
  

  // Mutation Observer for when large number in calculator
  const observer = new MutationObserver(checkDisplayContentSize)
  var config = {childList: true, characterData: true, subtree: true};
  observer.observe(currentDisplay, config);
  observer.observe(calculationDisplay, config);

  window.addEventListener('resize', () => {
    checkDisplayContentSize([{target: currentDisplay}, {target: calculationDisplay}])
  })

  window.addEventListener('keydown', (event) => {
    if (document.activeElement && document.activeElement.tagName === 'BUTTON') {
      document.activeElement.blur();
    }

    const button = document.querySelector(`button[data-key~="${event.code}"]`);
    if (button && !button.classList.contains('.active')) {
      button.getBoundingClientRect
      button.classList.toggle('active');
      button.click();
    }
  });

  window.addEventListener('keyup', (event) => {
    const button = document.querySelector(`button[data-key~="${event.code}"]`);
    if (button) button.classList.toggle('active');
  });

})()