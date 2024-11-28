import { Book } from "../models/bookModel.js";

export const getBooks = async (req, res) => {
  try {
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = Math.max(parseInt(req.query.skip) || 0, 0);

    const searchFilters = {};
    if (req.query.title) {
      searchFilters.title = { $regex: req.query.title, $options: "i" }; // Case-insensitive search
    }
    if (req.query.author) {
      searchFilters.author = { $regex: req.query.author, $options: "i" };
    }
    if (req.query.publishYear) {
      searchFilters.publishYear = req.query.publishYear;
    }

    const books = await Book.find(searchFilters).skip(skip).limit(limit);
    const totalBooks = await Book.countDocuments(searchFilters);

    return res.status(200).json({
      total: totalBooks,
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


export const saveBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    // Check if all required fields are provided
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Check for duplicates
    const existingBook = await Book.findOne({ title, author, publishYear });
    if (existingBook) {
      return res.status(409).send({
        message: "This book already exists",
      });
    }

    // Create the new book
    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ message: "This book already exists" });
    }
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

export const getBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
