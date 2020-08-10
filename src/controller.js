const recordModel = require('./model');
const mongoose = require('mongoose');
/**
 * Controller layer receives the request, response objects and processes any query parameters. The Controller layer also wraps lower layer calls in a try/catch block.
 */

const dateFromString = (dateString) => {
  return new Date(new Date(dateString))
}


// ? use sod/eod instead of those /\?
const sod = (dateString) => {
  return new Date(new Date(dateString))
}

function queryDocuments(params) {
  const {
    startDate, endDate, minCount, maxCount
  } = params;

  return recordModel.aggregate([
    {
      "$match": {
        "createdAt": {
          '$gte': dateFromString(startDate),
          '$lt': dateFromString(endDate)
        }
      }
    },
    {
      "$addFields": {
        "count": {
          "$reduce": {
            "input": "$counts",
            "initialValue": 0,
            "in": { "$add": ["$$value", "$$this"] }
          }
        }
      }
    },
    {
      "$match": {
        "count": {
          '$gte': minCount,
          '$lt': maxCount
        }
      }
    }
  ]);
}

fetchRecords = async (req, res) => {
  // parse && validate parameters
  const { startDate, endDate, minCount, maxCount } = req.body;

  if (!startDate || !endDate || !minCount || !maxCount) {
    throw Error('Missed required params');
  }

  // todo validation/verification

  try {
    const results = await queryDocuments({
      startDate, endDate, minCount, maxCount
    });
    console.log("fetchRecords -> results", results)

    return res.send(results);
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = { fetchRecords }