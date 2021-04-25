// Accounts Schema
const mongoose = require("mongoose");
const userModel = require('./users.model')

const accountSchema = mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_id: {
    type: Number,
    required: true,
    unique: false,
    validate(value) {
      
    }
  },
  amount: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
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
