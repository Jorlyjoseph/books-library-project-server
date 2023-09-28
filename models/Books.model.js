const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    isbn: {
      type: String,
      required: [true, 'ISBN number required']
    },
    title: {
      type: String,
      required: [true, 'Title required']
    },
    author: {
      type: String,
      required: [true, 'Author required']
    },
    catagory: {
      type: String,
      required: [true, 'Category required']
    },
    language: {
      type: String,
      required: [true, 'Language required']
    },
    published: { type: String, required: [true, 'Published required'] },
    location: {
      type: String,
      required: [true, 'Location required']
    },
    description: {
      type: String,
      required: [true, 'Description required']
    },
    avilable: {
      type: Boolean,
      required: [true, 'Availability required']
    }
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const Book = model('Book', bookSchema);

module.exports = Book;
