import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Saving a new Book
router.post('/', async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    // Check if all required fields are provided
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    // Check for duplicates
    const existingBook = await Book.findOne({ title, author, publishYear });
    if (existingBook) {
      return res.status(409).send({
        message: 'This book already exists',
      });
    }

    // Create the new book
    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to Get All Books from Database
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to Get All Books from Database by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to update a book
router.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book updated Successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
})

// Route for Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
})

export default router;