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

