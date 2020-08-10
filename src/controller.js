/**
 * Controller layer receives the request, response objects and processes any query parameters. The Controller layer also wraps lower layer calls in a try/catch block.
 */

const store = require("./store");
const { dateFromString, isValidDate } = require('./utils');
const ApiError = require("./objects/ApiError");
const { ERROR_CODE } = require('./constants');

const Controller = {
  fetchRecords: async (req, res, next) => {
    let { startDate, endDate, minCount, maxCount } = req.body;

    // NOTE Good point would be to use some more complex validation for those inputs by using express-validator/Joi
    try {
      if (!startDate || !endDate) {
        throw new ApiError(ERROR_CODE.BAD_REQUEST, 'Missed required parameters');
      }

      startDate = dateFromString(startDate);
      endDate = dateFromString(endDate);

      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        throw new ApiError(ERROR_CODE.BAD_REQUEST, 'Wrong date format for parameters');
      }

      // Assuming if at least one param is present, then second is required also
      if (minCount !== undefined || maxCount !== undefined) {
        minCount = parseInt(minCount);
        maxCount = parseInt(maxCount);

        if (isNaN(minCount) || isNaN(maxCount)) {
          throw new ApiError(ERROR_CODE.BAD_REQUEST, 'Proper integer value is required for "minCount" and "maxCount" parameters');
        }
      }
    } catch (error) {
      return next(error);
    }


    // Validation succeed, we aim for a query
    try {
      const results = await store.fetchData(startDate, endDate, minCount, maxCount);

      if (!results) {
        throw new ApiError(ERROR_CODE.NOT_FOUND, 'No records were found');
      }

      return next(results);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = Controller;
