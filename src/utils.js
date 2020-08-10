/**
 * Contains util functions to be used over the project
 */

/**
 * @description Converts sting to Date suitable for mongoose queries
 * @param {string} dateString
 */
const dateFromString = (dateString) => {
  return new Date(new Date(dateString))
}

/**
 * @param {Date} d
 */
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

module.exports = {
  dateFromString, isValidDate
}