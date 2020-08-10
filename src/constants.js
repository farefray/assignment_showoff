const CONSTANTS = {
  RESPONSE_CODE: {
    SUCCESS: 0,
    ERROR: -1,
    EMPTY: 1
  },
  RESPONSE_MSG: {
    SUCCESS: 'Success',
    GENERAL_ERROR: 'Error',
    EMPTY_RECORDS: 'No records are found'
  },
  ERROR_CODE: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    SERVICE_NOT_AVAILABLE: 503
  }
}

module.exports = CONSTANTS;