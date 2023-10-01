const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const readerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required']
    },
    dob: {
      type: Date,
      required: [true, 'DOB is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    active: {
      type: Boolean,
      required: [true, 'Active required'],
      default: true
    },
    borrowed_books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Books'
      }
    ],
    registration_date: {
      type: Date,
      required: [true, 'registration date required']
    }
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const Reader = model('Reader', readerSchema);

module.exports = Reader;
