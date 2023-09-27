const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    time: {
      type: Date,
      required: true
    },
    book_id: {
      type: String,
      required: true
    },
    reader_id: {
      type: String,
      required: true
    },
    transaction_type: {
      type: String,
      required: true
    }
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const User = model('User', userSchema);

module.exports = User;
