const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    isbn: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    published: { String, required: true },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avilable: {
      type: Boolean,
      required: true,
    },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
