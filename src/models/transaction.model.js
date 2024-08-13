import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  isbn: {
    type:  Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  borrowedDate: {
    type: Date,
    default : Date.now(),
    required: true,
  },
  returnDate: {
    type: Date,
  },
  transactionStatus : {
    type: String,
    enum: ["borrowed", "returned"],
    default : "borrowed",
  }
});

const Transaction = model("Transaction", TransactionSchema);
export default Transaction;
