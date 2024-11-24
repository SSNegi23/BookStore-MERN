import express from 'express';
import { Book } from '../models/bookModel.js';
import { deleteBook, getBookByID, getBooks, saveBook, updateBook } from '../controllers/booksController.js';

const router = express.Router();

// Route for Saving a new Book
router.post('/', saveBook);

// Route to Get All Books from Database
router.get('/', getBooks);

// Route to Get Book from Database by id
router.get('/:id', getBookByID);

// Route to update a book
router.put('/:id', updateBook);

// Route for Delete a book
router.delete('/:id', deleteBook);

export default router;