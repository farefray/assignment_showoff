/**
 * General middleware to handle responces to customer.
 * Formats error or success responses.
 */
const { RESPONSE_CODE, RESPONSE_MSG } = require("../constants");

const STATUS_OK = 200;

const ApiError = require("../objects/ApiError");

function apiResponseMiddleware(dataStream, req, res, next) {
  // Error handling
  if (dataStream instanceof ApiError) {
    const { statusCode, message } = dataStream;
    return res.status(statusCode).json({
      code: RESPONSE_CODE.ERROR,
      msg: message,
      records: []
    });
  } else if (dataStream instanceof Error) {
    // uncaught errors handling, could be logger or emitted somewhere
    return res.status(500).json({
      code: RESPONSE_CODE.ERROR,
      msg: RESPONSE_MSG.GENERAL_ERROR,
      records: []
    });
  }

  // Success response
  const hasRecordsFetched = dataStream && dataStream.length > 0;
  return res.status(STATUS_OK).json({
    code: hasRecordsFetched ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.EMPTY,
    msg: hasRecordsFetched ? RESPONSE_MSG.SUCCESS : RESPONSE_MSG.EMPTY_RECORDS,
    records: dataStream.map((rec) => ({
      key: rec.key,
      createdAt: rec.createdAt,
      totalCount: rec.count
    }))
  });
}

module.exports = {
  apiResponseMiddleware
};
