(function () {
  const operators = {
    '+': (a, b) => Number(a) + Number(b), // to avoid a + b = 'ab'
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  }

  function operate(var1, operator, var2) {
    return operators[operator](var1, var2);
  }
  
  
})()