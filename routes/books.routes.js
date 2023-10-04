const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Books.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

//  POST /api/books  -  Creates a new book
router.post('/books', isAuthenticated, (req, res, next) => {
  const {
    isbn,
    title,
    author,
    category,
    language,
    published,
    location,
    description,
    imageUrl
  } = req.body;

  return Book.create({
    isbn,
    title,
    author,
    category,
    language,
    published,
    location,
    description,
    available: true,
    image_url: imageUrl
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/books -  Retrieves all of the books
router.get('/books/search', (req, res, next) => {
  const { query, category } = req.query;
  const reg = new RegExp(query, 'i');

  if (category === 'title') {
    Book.find({ title: { $regex: reg } })
      .populate('reader_id', 'name')
      .then((books) => {
        res.status(200).json(books);
      })
      .catch(() => {
        res.status(500).send('Server error');
      });
  }

  if (category === 'author') {
    Book.find({ author: { $regex: reg } })
      .populate('reader_id', 'name')
      .then((books) => {
        res.status(200).json(books);
      })
      .catch(() => {
        res.status(500).send('Server error');
      });
  }
});

//  GET /api/books/:bookId -  Retrieves a specific book by id
router.get('/books/:bookId', isAuthenticated, (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Book.findById(bookId)
    .populate('reader_id', 'name')
    .then((book) => res.status(200).json(book))
    .catch((error) => res.json(error));
});

// PUT  /api/books/:booksId  -  Updates a specific book by id
router.put('/books/:bookId', isAuthenticated, (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Book.findByIdAndUpdate(bookId, req.body, { new: true })
    .then((updatedBook) => res.json(updatedBook))
    .catch((error) => res.json(error));
});

// DELETE  /api/books/:bookId  -  Deletes a specific book by id
router.delete('/books/:bookId', isAuthenticated, (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Book.findByIdAndRemove(bookId)
    .then(() =>
      res.json({
        message: `Project with ${bookId} is removed successfully.`
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
