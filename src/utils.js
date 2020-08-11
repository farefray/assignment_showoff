/**
 * Contains util functions to be used over the project
 */

const DATE_END_OF_DAY = 'eod';
const DATE_START_OF_DAY = 'sod';
/**
 * @description Converts sting to Date suitable for mongoose queries
 * @param {string} dateString
 * @param {string} modificator 'eod' - for end of day, 'sod' - for start of day
 */
const dateFromString = (dateString, modify) => {
  const date = new Date(dateString);
  if (modify === DATE_END_OF_DAY) {
    date.setHours(23,59,59,999);
  } else {
    date.setHours(0,0,0,0);
  }

  return new Date(date); // to have it as Date object
}

/**
 * @param {Date} d
 */
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

module.exports = {
  dateFromString, isValidDate,
  DATE_END_OF_DAY, DATE_START_OF_DAY
}