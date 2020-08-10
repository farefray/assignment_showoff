const CONSTANTS = {
  RESPONSE_CODE: {
    SUCCESS: 0,
    ERROR: -1,
    EMPTY: 1
  },
  RESPONSE_MSG: {
    // General error messages
    SUCCESS: 'Success',
    GENERAL_ERROR: 'General error',

    // Specific error cases
    EMPTY_RECORDS: 'No records are found',
    MISSED_REQUIRED_PARAM: 'Missed required parameters',
    WRONG_DATE_FORMAT: 'Wrong date format for parameters',
    WRONG_COUNT_FORMAT: 'Proper integer value is required for "minCount" and "maxCount" parameters'
  },
  ERROR_CODE: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    SERVICE_NOT_AVAILABLE: 503
  }
}

module.exports = CONSTANTS;