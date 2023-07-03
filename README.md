# Overview
This is a calculator that was created following the guidelines outlined by [The Odin Project](https://www.theodinproject.com/about) in the [final project](https://www.theodinproject.com/lessons/foundations-calculator) for their fundamentals course.

This readme contains several sections:
1. How to use
2. Problem
    * This includes the details regarding the project and my re-explanation into my own words of what is expected.
3. Process
    * This includes the steps taken to solve the problem (more so of my organization before I start each sub problem + and through iterations)
    * Also includes algorithms and any overview + explanation, along with any pseudocode I felt was necessary before coding to solve each sub problem.

# How to use
WIP

# Problem
## Calculator UI
To create a calculator, several crutial elements are required. These include:
1. Number buttons 0-9
2. An add button
3. A subtract button
4. A multiply button
5. A divide button
6. An equals button
7. A display window
7. *A decimal button*\*
8. *A clear/ clear all button*\*\
9. *+/- button*\*\
<small><small>* All though not required, these are fairly essential to have if this calculator is to be reliable.</small></small>

## Basic Functionality
Basic functionality can be broken into four separate subproblems.
1. Addition
2. Subtraction
3. Multiplication
4. Division

Although these subproblems are fairly easy - they still should be broken up because they are related to different buttons and will need to be connected later.

## Button Actions
When a user presses a button, several things should be taken into account:
1. Did the user press a number?
2. Did the user press an operand?
    * Can the user press an operand? (Is one already in action?)
3. Did the user press the equal button?
4. Did the user press the backspace button?
5. Did the user press the +/- button?
6. Did the user press the clear button?
7. Did the user press the decimal button?

## Calculation
Figuring out how the calculator should display before calculating is important to note before starting. In my case, I'd like to have it display the number that was recently calculated and keep it when calculating the next value. For example, the user presses 5 + 5 and gets back 10. 10 will continue to display, and if the user decides to press + and add 11, it'll display as: 10 + 11 and when they calculate it'll repeat this process (displaying: 21 --> displaying: 21 * 10 --> displaying: 210 etc.).

In more regards in how the calculator will function (unique features) there are some cases it should be able to work with.
1. If an operand is pressed twice it results in it adding itself (ex: 10 ++ --> 20)
2. If the equal sign is pressed again after calculating it results in the previous operand being used again on the result (ex: 15 + 10 --> 25 (press =) --> 35)

# Steps
## 1. Calculator UI
To start, a simple UI (to start) should be created fulfilling all the requirements outlined in the `Problem` section for this sub problem. From there, functionality can then slowly be added in. To do this, the base HTML will need to be created first, along with a simple linked style sheet. Styling will be improved on towards the end once all functionality has been added. 

In regards to styling, I considered using a grid system for the buttons, and although this would make more sense, I was having issues centering the text in each button without causing other issues. Due to this, and also because I want to improve on working with flex, I used flex-wrap in combination with width %s to ensure every button was the same size.

## 2. Basic Functionality
All four subproblems will rely on three variables: two operands and one operator. Seeing how this is the case, it's unlikely they need to be broken up into separate defined functions. However, due to the nature of Javascript, we cannot directly use the variable to do the work ex: ``return var1 operand var2;`` will not work. But, we can simplify things by using an object:
```
const calculations = {
    '+': (a, b) => a + b,
    ...
}
return calculations[operand](var1, var2);
```

## 3. Calculation
To start, I'll work with the basic functionality. This requires some necessary variables to keep track of what numbers are being manipulated, and what operator is being used on them. Additionally, these variables will be necessary for more complex features later on.

To get this set up, we'll need to add event listeners to all the operators. Each operator will actually do the same thing in terms of their display initially, so we can have the eventlistener for these buttons call the same function. Inside the function, we'll need to check for a couple of things. First, we'll need to check if an operand is already in the display -- we can create a variable for this. If it is, then for now we'll simply ignore it and not do anything, but later on this will act as an equal sign but then chain the operator into the next display. 

`addOperatorToDisplay`
```
if operator already in use
    ignore
    // later on, instead of ignoring this will result in a calculation of the current display and then chain the pressed operator onto the next display
// operator not in use
    update current operator to this one
    update display with this operator
    update variable indicating that display needs to be cleaned on next number push
    update first variable
```

Now that we have the operator functionality set up, all that's left to do here is calculate the result and update variables back to their appropriate states when the equal sign is pressed.

`equalSignPressed`
```
if operator in use
    check if there is a second variable
        call operate (function we defined earlier)
```






