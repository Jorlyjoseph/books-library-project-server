const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Log = require('../models/Logs.model');
const Books = require('../models/Books.model');
const Readers = require('../models/Readers.model');

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

//

router.post('/logs/transaction', (req, res, next) => {
  const { bookId, readerId, date, type } = req.body;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Log.create({
    book_id: bookId,
    reader_id: readerId,
    time: date,
    transaction_type: type
  }).catch((error) => res.json(error));

  if (type === 'lent') {
    Books.findByIdAndUpdate(bookId, {
      readerId: readerId,
      available: false
    }).catch((error) => res.json(error));

    Readers.updateOne(
      { _id: readerId },
      { $push: { borrowed_books: bookId } }
    ).catch((error) => res.json(error));
  }

  if (type === 'return') {
    Books.findByIdAndUpdate(bookId, {
      readerId: null,
      available: true
    }).catch((error) => res.json(error));

    Readers.updateOne(
      { _id: readerId },
      { $pull: { borrowed_books: { $eq: bookId } } }
    ).catch((error) => res.json(error));
  }

  res.status(200).json({
    success: true,
    message: 'Transaction added successfully'
  });
});

module.exports = router;
