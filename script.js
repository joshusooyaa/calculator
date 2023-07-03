(function () {
  /* "global" variables */
  let displayContent = '';

  /* elements */
  const currentDisplay = document.querySelector('.display .current-display');
  const previousDisplay = document.querySelector('.display .previous-display');
  const numberButtons = document.querySelectorAll('.calc-buttons .num-button');
  const clearButton = document.querySelector('.calc-buttons .clear');


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
    let numberPressed = this.textContent;
    if (currentDisplay.textContent === '0') currentDisplay.textContent = numberPressed;
    else currentDisplay.textContent += numberPressed;
    displayContent = currentDisplay.textContent;
  }

  function clearDisplay() {
    currentDisplay.textContent = '0';
    previousDisplay.textContent = '';
    displayContent = '';
  }

  /* event listeners */
  numberButtons.forEach(button => button.addEventListener('click', addNumberToDisplay));
  clearButton.addEventListener('click', clearDisplay);
})()