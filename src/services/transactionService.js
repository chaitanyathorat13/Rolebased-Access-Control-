import { login } from "../controllers/authController.js";
import * as transactionDataAccess from "../dataAccess/transactionDataAccess.js";
import Transaction from "../models/transaction.model.js";

export const borrowBook = async (userId, isbn) => {
  return await transactionDataAccess.createTransaction({
    userId,
    isbn,
  });
};

export const getBookTransaction = async (userId, isbn) => {
  const sortOptions = { borrowDate: -1 };
  const transaction = await transactionDataAccess.findOneTransactions(
    { userId, isbn },
    "",
    sortOptions
  );
  return transaction;
};
