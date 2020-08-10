const controller = require('../src/controller');
const { RESPONSE_MSG } = require('../src/constants');

describe('Controller tests', () => {
  const PROPER_START_DATE = '2020-08-08';
  const PROPER_END_DATE = '2017-01-28T01:22:14.398Z';
  it('should parse and validate parameters properly', () => {
    const validatedParameters = controller.validateParams({
      startDate: PROPER_START_DATE, endDate: PROPER_END_DATE,
      minCount: -10,
      maxCount: '15'
    })

    expect(validatedParameters.startDate.toString()).toBe('Sat Aug 08 2020 03:00:00 GMT+0300 (Eastern European Summer Time)');
    expect(validatedParameters.endDate.toString()).toBe('Sat Jan 28 2017 03:22:14 GMT+0200 (Eastern European Standard Time)');
    expect(validatedParameters.minCount).toBe(-10);
    expect(validatedParameters.maxCount).toBe(15);
  });

  it('should throw a proper error when date format is wrong', () => {
    expect(() => {
      controller.validateParams({
        startDate: PROPER_START_DATE, endDate: 'wrong date'
      });
    }).toThrow(RESPONSE_MSG.WRONG_DATE_FORMAT);

    expect(() => {
      controller.validateParams({
        startDate: 'wrong date', endDate: PROPER_END_DATE,
      });
    }).toThrow(RESPONSE_MSG.WRONG_DATE_FORMAT);
  });

  it('should throw a proper error when count params are wrong', () => {
    expect(() => {
      controller.validateParams({
        startDate: PROPER_START_DATE, endDate: PROPER_END_DATE, minCount: 10
      });
    }).toThrow(RESPONSE_MSG.WRONG_COUNT_FORMAT);

    expect(() => {
      controller.validateParams({
        startDate: PROPER_START_DATE, endDate: PROPER_END_DATE, minCount: 'qwerty', maxCount: 1000
      });
    }).toThrow(RESPONSE_MSG.WRONG_COUNT_FORMAT);
  });
});