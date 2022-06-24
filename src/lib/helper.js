/**
 * Remove IPs whose frequency is more thaan 10
 * 
 * @param {object} finalResultset 
 * @param {object} resultCounterObject 
 * @returns 
 */
function removeGreaterThanThenIP(finalResultset, resultCounterObject) {
  let updatedResultSet = [];
  for (var i = 0; i < finalResultset.length; i++) {
    let IP = finalResultset[i].ip;
    let count = resultCounterObject[IP];
    if (count <= 10) {
      updatedResultSet.push(finalResultset[i]);
    }
  }
  return updatedResultSet;
}

/**
 * checks whether the given IP exists is in the final counter array. If yes, then it updates the count of that IP. If no, it adds the IP to the counter array.
 * 
 * @param {object} resultsetObject 
 * @param {object} resultCounterObject 
 * @param {object} element 
 * @returns 
 */
const getResultObject = (resultsetObject, resultCounterObject, element) => {
  let isInIpCount = resultCounterObject.hasOwnProperty(element.ip);
  if (isInIpCount) {
    let count = ++resultCounterObject[element.ip];
    resultCounterObject[element.ip] = count;
  } else {
    resultCounterObject[element.ip] = 1;
  }
  if (!resultsetObject.hasOwnProperty(element.ip)) {
    resultsetObject[element.ip] = element;
  } else {
    // checking if the amount of the current IP click more than the existing click. If yes then it replaces the existing click object for the given IP
    if (resultsetObject[element.ip].amount < element.amount) {
      resultsetObject[element.ip] = element;
    } else if (resultsetObject[element.ip].amount == element.amount) { //checking if the amount is same then the click with earlier timestamp should be recorded.
      if (new Date(element.timestamp) < new Date(resultsetObject[element.ip].timestamp)) {
        resultsetObject[element.ip] = element;
      }
    }
  }
  return resultsetObject;
}

/**
 * Returns the hours and time period
 * 
 * @param {object} element 
 * @returns 
 */
const getTimeStamp = (element) => {
  let time_period_hours = new Date(element.timestamp).getHours();
  let date_period = new Date(element.timestamp).toLocaleDateString();
  return { time_period_hours, date_period }
}

module.exports = {
  removeGreaterThanThenIP,
  getResultObject,
  getTimeStamp
}