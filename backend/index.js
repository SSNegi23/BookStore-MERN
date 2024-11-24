import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Middleware for parsing request body
app.use(express.json());
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(
  cors({
    origin: 'http://localhost:5173',   //! update origin according to fontend link
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// app.use(
//   cors({
//     origin: 'https://bookstore-mern-frontend-seyt.onrender.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);

// app.use("/login", log)

mongoose.connect(MONGODB_URL).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
})