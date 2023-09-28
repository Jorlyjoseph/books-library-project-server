const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const log = require('../models/Logs.model');
const Log = require('../models/Logs.model');

router.get('/logs', (req, res) => {
  res.send('logs route is working');
});
//  POST /api/logs  -  Creates a new log
router.post('/logs', (req, res) => {
  const { time, book_id, reader_id, transaction_type } = req.body;
  // console.log(jointdate, active);
  return Log.create({
    time,
    book_id,
    reader_id,
    transaction_type
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/logs -  Retrieves all of the logs
router.get('/logs', (req, res, next) => {
  Logs.find()
    .then((allLogs) => res.json(allLogs))
    .catch((err) => res.json(err));
});

//  GET /api/logs/:logId -  Retrieves a specific log by id
router.get('/logs/:logId', (req, res, next) => {
  const { logId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(logId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Log.findById(logId)
    .then((log) => res.status(200).json(log))
    .catch((error) => res.json(error));
});

module.exports = router;
