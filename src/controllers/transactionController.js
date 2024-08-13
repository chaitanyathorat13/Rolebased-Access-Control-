import User from "../models/user.models.js";
import AppError from "../utils/appError.js";
import * as userService from "../services/userService.js";
import * as bookService from "../services/bookService.js";
import * as transcationService from "../services/transactionService.js";
import asyncHandler from "../utils/asyncHandler.js";
import Transaction from "../models/transaction.model.js";
import ApiResponse from "../utils/apiRespnose.js";

export const borrowBook = asyncHandler(async (req, res) => {
    const { userId, isbn } = req.body;

    if (!(userId && isbn)) {
        throw new AppError(400, "All fields are required...");
    }
    const user = await userService.getUserById(userId);
    if (!user) {
        throw new AppError(400, "User is not found");
    }

    if (user.borrowedBooks >= 3) {
        throw new AppError(400, "User should not borrow more than 3 books");
    }

    const book = await bookService.getBookByISBN(Number(isbn));
    if (!book) {
        throw new AppError(400, `No book found with isbn ${isbn}`);
    }

    if (book.status === "borrowed") {
        throw new AppError(
            400,
            "Book is already borrowed so you cant borrow this book..."
        );
    }

    const bookTranscation = await transcationService.borrowBook(
        userId,
        Number(isbn)
    );
    book.status = "borrowed";
    user.borrowedBooks += 1;
    await user.save();
    await book.save();

    res.send(new ApiResponse(200, bookTranscation));
});

export const returnBook = asyncHandler(async (req, res) => {
    const { userId, isbn } = req.body;
    if (!(userId && isbn)) {
        throw new AppError(400, "All fields are required...");
    }
    const user = await userService.getUserById(userId);
    if (!user) {
        throw new AppError(400, "User is not found");
    }

    const book = await bookService.getBookByISBN(isbn);
    if (!book) {
        throw new AppError(400, `No book found with isbn ${isbn}`);
    }

    if (book.status === "avaliable") {
        throw new AppError(
            400,
            "book is not checked out so how can u return it...?"
        );
    }

    const getBookTranscation = await transcationService.getBookTransaction(
        userId,
        isbn
    );
    console.log(getBookTranscation);
    if (!getBookTranscation) throw new AppError(400, "No transcation Found...");

    getBookTranscation.returnDate = new Date();
    getBookTranscation.transactionStatus = "returned";
    user.borrowedBooks -= 1;
    book.status = "available";

    await getBookTranscation.save();
    await user.save();
    await book.save();

    res.send(
        new ApiResponse(200, getBookTranscation, "Book sucessfully returned...")
    );
});