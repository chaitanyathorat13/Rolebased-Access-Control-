import * as bookDataAcess from "../dataAccess/bookDataAccess.js";

export const addNewBook = async (title, author, isbn) => {
  return await bookDataAcess.createBook({
    title,
    author,
    isbn,
  });
};

export const getBookById = async (bookId) => {
  const book = await bookDataAcess.findBookById(bookId);
  return book;
};

export const getAllBooks = async () => {
  return await bookDataAcess.findAllBooks();
};

export const getBookByISBN = async (isbn) => {
  return await bookDataAcess.findBookByISBN(isbn);
};
