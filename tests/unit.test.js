const controller = require('../src/controller');
const store = require('../src/store');


describe('testing db connection', () => {
  beforeAll(async () => {
    // todo Mock db connection
  })

  // beforeEach(async () => {
  //   await store.connect(global.__MONGO_URI__)
  // });

  test('should fetch records', async (done) => {
    // const result = await controller.fetchRecords();
    // expect(result).toHaveLength();
    done();
  });
});