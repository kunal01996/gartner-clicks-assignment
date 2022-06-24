/**
 * 
 * index.js
 * The application is launched from this file.
 * We are gathering the input from data/clicks.json.
 * Using /lib/index.js to calculate the desired subset.
 * We are then storing the result in /out folder.
 */

const {
  findSubset,
  storeResult
} = require('./lib')

const clicks = require('./data/clicks.json')

console.log('Calculating subsets...')
const subset = findSubset(clicks)

// saving the final output into /out/subset.json
console.log('Saving subsets...')
storeResult(subset)
