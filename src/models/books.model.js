import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["available", "borrowed"],
    default: "available",
  },
});

const Book = model("Book", BookSchema);
export default Book;
