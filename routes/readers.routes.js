const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reader = require('../models/Readers.model');

//  POST /api/readers  -  Creates a new reader
router.post('/readers/create', (req, res) => {
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

//  GET /api/readers -  Retrieves all of the active readers
router.get('/readers', (req, res, next) => {
  Reader.find()
    .then((allReaders) => {
      const activeUsers = allReaders.filter((reader) => reader.active === true);
      res.json(activeUsers);
    })
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
  const { name, dob, email, active } = req.body;

  if (!mongoose.Types.ObjectId.isValid(readerId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Reader.findByIdAndUpdate(readerId, { name, dob, email, active })
    .then(() =>
      res.json({
        success: true,
        message: 'Reader updated successfully'
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
