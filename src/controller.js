const recordModel = require('./model');

exports.fetchRecords = async (req, res) => {
  try {
    const results = await recordModel.find();
    return res.send(results);
  } catch (e) {
    return res.status(400).send(e);
  }
};