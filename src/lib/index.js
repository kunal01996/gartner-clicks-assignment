const path = require('path')
const fs = require('fs')
const {
  getResultObject,
  getTimeStamp,
  removeGreaterThanThenIP
} = require('./helper')

/**
 * Store the logic to calculate the following:
 * Given an array of clicks, return the subset of clicks where:
 * 1. For each IP within each one hour period, only the most expensive click is placed into the result set.
 * 2. If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.
 * 3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set. 
 * 
 * @param {Array<Object>} clicks 
 * @returns {Array<Object>} clicks
 */
function findSubset(clicks) {

  if (!clicks || !Array.isArray(clicks)) {
    throw new Error('No Input!')
  } else {
    let resultsetObject = {};
    let resultCounterObject = {};
    let finalResultset = [];
    let prevTimePeriod = -1;
    let prevDatePeriod = -1;
    let outputResultSet = [];
    // iterating over each occurrence of the clicks object
    clicks.forEach(element => {
      let timestamp = getTimeStamp(element); // function which returns hours and date from the given timestamp
      let time_period = timestamp.time_period_hours; // finding out the selected element's hours
      let current_date_period = timestamp.date_period; // finding out the selected element's date

      if (prevDatePeriod != -1 && prevDatePeriod != current_date_period) { //check for different dates
        finalResultset = finalResultset.concat(Object.values(resultsetObject));
        finalResultset = removeGreaterThanThenIP(finalResultset, resultCounterObject);
        outputResultSet = outputResultSet.concat(finalResultset); // concatenate the final result into one array
        finalResultset = [];
        resultCounterObject = {};
        resultsetObject = {};
        prevTimePeriod = -1;
        prevDatePeriod = -1;
        resultsetObject = getResultObject(resultsetObject, resultCounterObject, element);
      } else {
        if (prevTimePeriod == -1 || time_period == prevTimePeriod) {
          resultsetObject = getResultObject(resultsetObject, resultCounterObject, element);
        } else {
          finalResultset = finalResultset.concat(Object.values(resultsetObject));
          resultsetObject = {};
          resultsetObject = getResultObject(resultsetObject, resultCounterObject, element);
        }
        prevTimePeriod = time_period;
      }
      prevDatePeriod = current_date_period;

    });
    finalResultset = finalResultset.concat(Object.values(resultsetObject));
    finalResultset = removeGreaterThanThenIP(finalResultset, resultCounterObject);
    outputResultSet = outputResultSet.concat(finalResultset);
    return outputResultSet; // the final subset of given input set
  }

}

/**
 * @param {Array<Object>} clicks 
 * @returns {Array<Object>} clicks
 */
function storeResult(clicks) {

  let jsonData = JSON.stringify(clicks);
  fs.writeFile(path.join('src', 'out', 'subset.json'), jsonData, error => {
    if (error) {
      console.log("ERROR while writing to file! :", error);
    } else {
      console.log("Clicks subset saved to file successfully.");
    }
  })

}

module.exports = {
  findSubset,
  storeResult
}
