// Users schemea (id, first name, last name, dateAdded)
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    required: true,
    unique: false,
    validate(value) {
      if (value.length < 4)
        throw new Error("Password length should be at least 4 characters");
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Generate Auth Token for a specific user
// methods are for instances of the model
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismysecret");
  user.tokens = user.tokens.concat({ token });
  return token;
};

// Find user by email and password
// Statics are static methods of the whole class, not instances
userSchema.statics.findByCredentials = async (email, password) => {
  console.log("find by credentials");
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  console.log("comparing " + password + " to " + user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Passwords do not match");
    throw new Error("Unable to login");
  }
  console.log("user found, can LOGIN");
  return user;
};

// Hash a plain text password prior to saving
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("pre save hashing", this);
  if (user.isModified("password")) {
    console.log("hashing password");
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
// module.exports = mongoose.model("users", userSchema);
