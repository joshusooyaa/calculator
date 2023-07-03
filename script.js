(function () {
  const operators = {
    '+': (a, b) => Number(a) + Number(b), // to avoid a + b = 'ab'
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  }

  /* elements */
  const currentDisplay = document.querySelector('.display .current-display');
  const numberButtons = document.querySelectorAll('.calc-buttons .num-button');

  /* event listener functions */
  function operate(var1, operator, var2) {
    return operators[operator](var1, var2);
  }

  function addNumberToDisplay() {
    let numberAdded = this.textContent;
    currentDisplay.textContent += numberAdded;
    //thiscurrentDisplay.textContent = 
  }
  

  /* event listeners */
  numberButtons.forEach(button => button.addEventListener('click', addNumberToDisplay));

})()