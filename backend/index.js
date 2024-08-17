import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS(Cross Origin Resource Sharing) Policy
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins (better option)
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
})