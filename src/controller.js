/**
 * Controller layer receives the request, response objects and processes any query parameters. The Controller layer also wraps lower layer calls in a try/catch block.
 */

const store = require("./store");
const { dateFromString, isValidDate, DATE_END_OF_DAY, DATE_START_OF_DAY } = require('./utils');
const ApiError = require("./objects/ApiError");
const { ERROR_CODE, RESPONSE_MSG } = require('./constants');

const Controller = {
  /**
   * @description extracts all the required parametersfor our request from body
   * With more methods/endpoints it would be moved to separated structure and good point would be to use some more complex validation for those inputs by using express-validator/Joi
   * @param {object} body
   * @param {string} body.startDate
   * @param {string} body.endDate
   * @param {number} [body.minCount] optional
   * @param {number} [body.maxCount] optional
   */
  validateParams: ({ startDate, endDate, minCount, maxCount }) => {
    if (!startDate || !endDate) {
      throw new ApiError(ERROR_CODE.BAD_REQUEST, RESPONSE_MSG.MISSED_REQUIRED_PARAM);
    }

    startDate = dateFromString(startDate, DATE_START_OF_DAY);
    endDate = dateFromString(endDate, DATE_END_OF_DAY);

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      throw new ApiError(ERROR_CODE.BAD_REQUEST, RESPONSE_MSG.WRONG_DATE_FORMAT);
    }

    // Assuming if at least one param is present, then second is required also
    if (minCount !== undefined || maxCount !== undefined) {
      minCount = parseInt(minCount);
      maxCount = parseInt(maxCount);

      if (isNaN(minCount) || isNaN(maxCount)) {
        throw new ApiError(ERROR_CODE.BAD_REQUEST, RESPONSE_MSG.WRONG_COUNT_FORMAT);
      }
    }

    return { startDate, endDate, minCount, maxCount };
  },
  fetchRecords: async function (req, res, next) {
    try {
      const params = Controller.validateParams(req.body);

      // Validation succeed, we aim for the query
      const results = await store.fetchData(params.startDate, params.endDate, params.minCount, params.maxCount);

      if (!results) {
        throw new ApiError(ERROR_CODE.NOT_FOUND, RESPONSE_MSG.EMPTY_RECORDS);
      }

      return next(results);
    } catch (error) {
      return next(error);
    }
  }
};

module.exports = Controller;
