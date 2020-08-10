const request = require('supertest');
const app = require('../src/app');
const mockingoose = require('mockingoose').default;
const Record = require('../src/models/Record');

const { RESPONSE_MSG, RESPONSE_CODE } = require('../src/constants');

const MOCK_RECORDS = [{
  "key": "AWRWERWED23423",
  "createdAt": "2020-08-10T08:48:35.889Z",
  "counts": [10, 20, 10]
},
{
  "key": "QQQQERWED23423",
  "createdAt": "2020-08-10T08:49:27.387Z",
  "counts": [10, 5, 10]
},
{
  "key": "AASDQQZXCZXCRWED23423",
  "createdAt": "2020-08-10T08:49:49.293Z",
  "counts": [10, 50, 10]
}];

const BASIC_PARAMS_EXAMPLE = {
  startDate: "2016-01-26",
  endDate: "2020-12-30"
};

mockingoose.Record.toReturn(MOCK_RECORDS, 'aggregate');

describe('POST /', function () {
  it('responds with json', function () {
    return request(app)
      .post('/')
      .send(BASIC_PARAMS_EXAMPLE)
      .expect('Content-Type', /json/);
  });

  it('has a proper structure response', () => {
    return request(app).post('/').send(BASIC_PARAMS_EXAMPLE).then((response) => {
      const { body } = response;
      expect(body.code).toEqual(RESPONSE_CODE.SUCCESS);
      expect(body.msg).toMatch(RESPONSE_MSG.SUCCESS);
      expect(body.records).toEqual(expect.any(Array));
    });
  });

  it('responses with error when no mandatory params filled', () => {
    return request(app).post('/')
      .expect('Content-Type', /json/)
      .then((response) => {
        const { body } = response;
        expect(body.code).toEqual(RESPONSE_CODE.ERROR);
        expect(body.msg).toMatch(RESPONSE_MSG.MISSED_REQUIRED_PARAM);
        expect(body.records).toEqual(expect.any(Array));
      });
  });
});

