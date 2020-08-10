const request = require('supertest');
const app = require('../src/app');

const SUCCESS_RESPONSE_MSG = 'Success';

describe('POST /', function () {
  it('responds with json', async (done) => {
    request(app)
      .post('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  // Assuming that no params should return all the records
  it('has a proper structure response', async (done) => {
    const response = await request(app).post('/');
    expect(response.code).toBeGreaterThanOrEqual(0);
    expect(response.msg).toMatch(SUCCESS_RESPONSE_MSG);
    expect(response.records).toEqual(expect.any(Array));
    done();
  });
});

