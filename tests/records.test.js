const controller = require('../src/controller');
const store = require('../src/store');

const axios = require('axios');


// todo Mock db connection
describe('testing db connection', () => {
  beforeAll(async () => {
    console.log('b4 all');
    const api = axios.create({ baseURL: `http://localhost:3000` });
    this.api = api;
  })

  // beforeEach(async () => {
  //   await store.connect(global.__MONGO_URI__)
  // });

  test('should fetch records', async () => {
    // const result = await controller.fetchRecords();
    // expect(result).toHaveLength();
    const response = await this.api.post('/', {})
    expect(response).to.have.property('status', 200);
  });
});