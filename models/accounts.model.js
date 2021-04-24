// Accounts Schema
const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
    unique: true,
  },
  uesr_id: {
    type: Number,
    required: true,
    unique: false,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  credit: {
    type: Number,
    required: true,
    default: 0,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const accountModel = mongoose.model("accounts", accountSchema);
module.exports = accountModel;
// module.exports = mongoose.model("users", userSchema);
