// Users schemea (id, first name, last name, dateAdded)
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
    unique: false,
  },
  last_name: {
    type: String,
    required: true,
    unique: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
// module.exports = mongoose.model("users", userSchema);
