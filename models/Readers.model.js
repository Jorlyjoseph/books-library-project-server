const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const readerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required']
    },
    jointdate: {
      type: Date,
      required: [true, 'Jointdate required']
    },
    active: {
      type: Boolean,
      required: [true, 'Active required'],
      default: false
    },
    borrowed_books: {
      type: Boolean,
      required: [true, 'Borrowed_books required']
    }
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const Reader = model('Reader', readerSchema);

module.exports = Reader;
