// import Transaction from "../models/transaction.model.js";
// import generalModelMethods from "./generalModelMethods.js";

// // Initialize the general methods for the Transaction model
// const transactionMethods = generalModelMethods(Transaction);

import Transaction from "../models/transaction.model.js";

import generalCreateModelMethod from "./general/createQueries.js";
import generalFindModelMethod from "./general/findQueries.js";
import generalUpdateModelMethod from "./general/updateQueries.js";
import generalDeleteModelMethod from "./general/deleteQueries.js";

const { addNew } = generalCreateModelMethod(Transaction);
const { findOne, findById, getAllRecords, getFilteredRecords } =
  generalFindModelMethod(Transaction);
const { updateOne } = generalUpdateModelMethod(Transaction);
const { deleteById } = generalDeleteModelMethod(Transaction);

const createTransaction = async (data) => addNew(data);

const findTransactionById = async (id) =>
  findById({
    id,
  });

const findAllTransactions = async () => getAllRecords();

const findOneTransactions = async (
  filter,
  populateOptions = "",
  sortOptions = {},
  selectOptions = ""
) =>
  findOne(
    filter,
    populateOptions,
    selectOptions,
    sortOptions,
  );

const findTransactions = async (
  filter,
  populateOptions = "",
  sortOptions = {},
  selectOptions = ""
) =>
  getFilteredRecords({
    filter,
    populateOptions,
    selectOptions,
    sortOptions,
  });

const updateTransactionById = async (id, data) =>
  updateOne({
    filter: { _id: id },
    update: data,
    options: { new: true },
  });

const deleteTransactionById = async (id) => Transaction.findByIdAndDelete(id);

export {
  createTransaction,
  findTransactionById,
  findAllTransactions,
  findTransactions,
  updateTransactionById,
  deleteTransactionById,
  findOneTransactions,
};
