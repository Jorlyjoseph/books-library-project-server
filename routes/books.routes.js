const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/Books.model');

router.get('/books', (req, res) => {
  res.send('books route is working');
});
//  POST /api/books  -  Creates a new book
router.post('/books', (req, res, next) => {
  const {
    isbn,
    name,
    author,
    catagory,
    language,
    published,
    location,
    description,
    avilable
  } = req.body;
  console.log(author, avilable);
  return Book.create({
    isbn,
    name,
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
router.get('/books', (req, res, next) => {
  Books.find()
    .then((allBooks) => res.json(allBooks))
    .catch((err) => res.json(err));
});

//  GET /api/books/:bookId -  Retrieves a specific book by id
router.get('/books/:bookId', (req, res, next) => {
  const { booksId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Book.findById(bookId)
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

  Book.findByIdAndUpdate(bookId, req.body, { new: true })
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

  Book.findByIdAndRemove(bookId)
    .then(() =>
      res.json({
        message: `Project with ${bookId} is removed successfully.`
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
