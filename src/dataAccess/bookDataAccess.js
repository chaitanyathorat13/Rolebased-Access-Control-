import Book from "../models/books.model.js";

import generalCreateModelMethod from "./general/createQueries.js";
import generalFindModelMethod from "./general/findQueries.js";
import generalUpdateModelMethod from "./general/updateQueries.js";
import generalDeleteModelMethod from "./general/deleteQueries.js";

const { addNew } = generalCreateModelMethod(Book);
const { findOne, findById, getAllRecords, getFilteredRecords } =
  generalFindModelMethod(Book);
const { updateOne } = generalUpdateModelMethod(Book);
const { deleteById } = generalDeleteModelMethod(Book);

const createBook = async (data) =>
  addNew(
    data,
  );

const findBookByISBN = async (isbn) =>
  findOne({
    filter: { isbn },
  });

const findBookById = async (id) =>
  findById({
    id,
  });
const findAllBooks = async () => getAllRecords();

const updateBookById = async (id, data) =>
  updateOne({
    filter: { _id: id },
    update: data,
    options: { new: true },
  });

const deleteBookById = async (id) =>
  deleteById({
    id,
  });

const findBooks = async (filter, populateOptions = "") =>
  getFilteredRecords({
    filter,
    populateOptions,
  });
export {
  createBook,
  findBookByISBN,
  findBookById,
  findAllBooks,
  updateBookById,
  deleteBookById,
  findBooks,
};
