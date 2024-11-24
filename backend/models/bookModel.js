import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// Add a compound unique index
bookSchema.index({ title: 1, author: 1, publishYear: 1 }, { unique: true });

export const Book = mongoose.model('Book', bookSchema);