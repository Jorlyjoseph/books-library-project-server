const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const logSchema = new Schema(
  {
    time: {
      type: Date,
      required: true
    },
    book_id: {
      type: ObjectId,
      ref: 'Books',
      required: true
    },
    reader_id: {
      type: ObjectId,
      ref: 'Readers',
      required: true
    },
    transaction_type: {
      type: String,
      enum: ['lent', 'return'],
      required: true
    }
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const Log = model('Log', logSchema);

module.exports = Log;
