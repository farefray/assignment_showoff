const recordModel = require('./model');

/**
 * Controller layer receives the request, response objects passed from the Routing layer and processes any query parameters. The Controller layer also wraps lower layer calls in a try/catch block.
 */

exports.fetchRecords = async (req, res) => {
  // parse && validate parameters

  try {
    const results = await recordModel.find().toArray();
    return res.send(results);
  } catch (e) {
    return res.status(400).send(e);
  }
};