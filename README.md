### Take Home Assignment

Take home assignment solution for Gartner Interview process.

### The following key pieces of technology was used:
- Node.js
- JavaScript Programming Language

### Requirements
Given an array of clicks, return the subset of clicks where: 

1. For each IP within each one hour period, only the most expensive click is placed into the result set.
2. If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.
3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set. 

The result set should be stored in an array of hashes. Each hash should represent a click.
The expected result set should be a subset of the original array.

### Prerequisites
Please make sure that Node.js is installed on the device where this code needs to be run. NPM will be used to run any command from shell/terminal to run the code.
One of the best ways to setup Node.js is using NVM.

#### Test Cases
Jest is used for writing test cases.

 ### Installation Process

 First, unzip the folder and open the terminal on the extracted folder.
 Second, use the package manager 'npm' to install all the required packages, using command npm i or npm install in the terminal.

 ### Running the code
 Command to run the solution:
    npm run solution

 Command to run the test cases:
    npm run test