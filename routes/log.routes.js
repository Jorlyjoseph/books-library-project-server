const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Log = require('../models/Logs.model');

//get logs by bookId

//  GET /api/logs -  Retrieves a specific log by id
router.get('/logs', (req, res, next) => {
  const { bookId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Log.find({ book_id: bookId })
    .then((log) => res.status(200).json(log))
    .catch((error) => res.json(error));
});

module.exports = router;
