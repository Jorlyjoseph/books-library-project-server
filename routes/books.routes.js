const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Books = require('../models/Books.model');

router.get('/books', (req, res) => {
  res.send('books route is working');
});
//  POST /api/books  -  Creates a new book
router.post('/books', (req, res, next) => {
  const {
    isbn,
    title,
    author,
    catagory,
    language,
    published,
    location,
    description,
    avilable
  } = req.body;
  console.log(author, avilable);
  return Books.create({
    isbn,
    title,
    author,
    catagory,
    language,
    published,
    location,
    description,
    avilable: true
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/books -  Retrieves all of the books
router.get('/books/search', (req, res, next) => {
  // search with title, author
  //
  const { query, category } = req.query;
  const reg = new RegExp(query, 'i');

  if (category === 'title') {
    Books.find({ title: { $regex: reg } })
      .then((books) => {
        res.status(200).json(books);
      })
      .catch(() => {
        res.status(500).send('Server error');
      });
  }

  if (category === 'author') {
    Books.find({ author: { $regex: reg } })
      .then((books) => {
        res.status(200).json(books);
      })
      .catch(() => {
        res.status(500).send('Server error');
      });
  }
});

//  GET /api/books/:bookId -  Retrieves a specific book by id
router.get('/books/:bookId', (req, res, next) => {
  const { booksId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Books.findById(bookId)
    .then((book) => res.status(200).json(book))
    .catch((error) => res.json(error));
});

// PUT  /api/books/:booksId  -  Updates a specific book by id
router.put('/books/:bookId', (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Books.findByIdAndUpdate(bookId, req.body, { new: true })
    .then((updatedBook) => res.json(updatedBook))
    .catch((error) => res.json(error));
});

// DELETE  /api/books/:bookId  -  Deletes a specific book by id
router.delete('/books/:bookId', (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Books.findByIdAndRemove(bookId)
    .then(() =>
      res.json({
        message: `Project with ${bookId} is removed successfully.`
      })
    )
    .catch((error) => res.json(error));
});

router.post('/books/trasaction', (req, res, next) => {
  // {
  //   readerId,
  //   bookId,
  //   action: 'return' | 'lent'
  // }
});

module.exports = router;
