import { Book } from '../models/bookModel.js';

export const getBooks = async (req, res) => {
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
}

export const saveBook = async (req, res) => {
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
        if (err.code === 11000) {
            return res.status(409).send({ message: 'This book already exists' });
        }
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
}