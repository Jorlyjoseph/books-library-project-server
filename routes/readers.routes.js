const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reader = require('../models/Readers.model');

router.get('/readers', (req, res) => {
  res.send('readers route is working');
});
//  POST /api/readers  -  Creates a new reader
router.post('/readers', (req, res) => {
  const { name, dob, registrationDate, email } = req.body;

  return Reader.create({
    name,
    registration_date: registrationDate,
    active: true,
    email,
    dob
  })
    .then(() =>
      res.json({
        success: true,
        message: 'Reader creation successful'
      })
    )
    .catch((err) => res.json(err));
});

//  GET /api/readers -  Retrieves all of the readers
router.get('/readers', (req, res, next) => {
  Readers.find()
    .then((allReaders) => res.json(allReaders))
    .catch((err) => res.json(err));
});

//  GET /api/readers/:readerId -  Retrieves a specific reader by id
router.get('/readers/:readerId', (req, res, next) => {
  const { readerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(readerId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Reader.findById(readerId)
    .then((reader) => res.status(200).json(reader))
    .catch((error) => res.json(error));
});

// PUT  /api/readers/:readersId  -  Updates a specific reader by id
router.put('/readers/:readerId', (req, res, next) => {
  const { readerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(readerId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Reader.findByIdAndUpdate(readerId, req.body, { new: true })
    .then((updatedReader) => res.json(updatedReader))
    .catch((error) => res.json(error));
});

// DELETE  /api/readers/:readerId  -  Deletes a specific reader by id
router.delete('/readers/:readerId', (req, res, next) => {
  const { readerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(readerId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Reader.findByIdAndRemove(readerId)
    .then(() =>
      res.json({
        message: `Project with ${readerId} is removed successfully.`
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
