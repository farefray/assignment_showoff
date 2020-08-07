const controller = require('../src/controller')

describe('testing db connection', () => {
  beforeEach(() => {
   console.log('b4 ea')
  });

  test('should fetch records', async () => {
    const result = await controller.fetchRecords();
    expect(result).toHaveLength();
  });
});