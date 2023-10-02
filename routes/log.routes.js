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
  })
    .then(() => {
      if (type === 'lent') {
        Books.findByIdAndUpdate(
          bookId,
          {
            reader_id: readerId,
            available: false
          },
          { new: true }
        )
          .then((updatedBook) => {
            res.json(updatedBook);
            return;
          })
          .catch((error) => {
            res.json({ error: 'Oops! something went wrong' });
          });

        Readers.updateOne(
          { _id: readerId },
          { $addToSet: { borrowed_books: bookId } }
        ).catch((error) => {
          console.log(error);
          res.json({ error: 'Oops! something went wrong' });
        });
      }

      if (type === 'return') {
        Books.findByIdAndUpdate(bookId, {
          reader_id: null,
          available: true
        }).then(() => {
          res.json({
            success: true,
            message: 'Book return successful'
          });
          return;
        });

        Readers.updateOne(
          { _id: readerId },
          { $pull: { borrowed_books: { $eq: bookId } } }
        ).catch((error) => {
          res.json({ error: 'Oops! something went wrong' });
        });
      }
    })
    .catch((error) => {
      res.json({ error: 'Oops! something went wrong' });
    });
});

router.get('/logs/book/:bookId', (req, res, next) => {
  // search with logs with bookid
  //
  const { bookId } = req.params;

  Log.find({ book_id: bookId })
    .then((logs) => {
      res.status(200).json(logs);
    })
    .catch(() => {
      res.status(500).send('Server error');
    });
});

module.exports = router;
