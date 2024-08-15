import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN Stack Tutorial');
});

// Route for Saving a new Book
app.post('/books', async (req, res) => {
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
app.get('/books', async (req, res) => {
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
app.get('/books/:id', async (req, res) => {
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
app.put('/books/:id', async (req, res) => {
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
app.delete('/books/:id', async (req, res) => {
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

mongoose.connect(mongoDBURL).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
})