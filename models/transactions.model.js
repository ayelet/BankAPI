// Transaction Model - Transaction number, user and amount transfered or withdrawen from account
const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  transaction_id: {
    type: number,
    required: true,
    unique: true,
  },
  account_id: {
    type: number,
    required: true,
    unique: false
  },
  amount: {
      type: Number,
      required: true,
      unique: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const transactionModel = mongoose.model("transactions", userSchema);
module.exports = transactionModel;

