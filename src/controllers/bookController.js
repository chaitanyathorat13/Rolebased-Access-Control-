import * as bookService from "../services/bookService.js";
import ApiResponse from "../utils/apiRespnose.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

const addNewBookController = asyncHandler(async (req, res) => {
  const { title, author, isbn } = req.body;
   
  if (!(title && author && isbn)) {
    throw new AppError(400, "all fileds are required");
  }

  const book = await bookService.addNewBook(title, author, isbn);
  
  res.send(new ApiResponse(200, book, "new book added..."));
});

const getBookById = asyncHandler(async (req, res) => {
  const bookId = req.params?.bookId;
  console.log(bookId);
  if (!bookId) {
    throw new AppError(400, "book id is required");
  }
  const book = await bookService.getBookById(bookId);

  res.send(new ApiResponse(200, book));
});

const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await bookService.getAllBooks();
  res.send(new ApiResponse(200, allBooks));
});

const getBookByISBN = asyncHandler(async (req, res) => {
  const isbn = req.params?.isbn;
  if (!isbn) {
    throw new AppError(400, "isbn is required");
  }
  const book = await bookService.getBookByISBN(isbn);
});

const deleteBookController = (req, res) => {};

export {
  addNewBookController,
  deleteBookController,
  getBookById,
  getAllBooks,
  getBookByISBN,
};
