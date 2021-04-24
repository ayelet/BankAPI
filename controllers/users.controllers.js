// const roomModel = require("../db/model");
const userModel = require("../models/users.model");
// Helper functions
const validate = (id) => {
  if (!id || id < 0) return false;
  return true;
};
// 1. Get all users
const getUsers = async (res) => {
  const users = await userModel.find({});

  try {
    if (!users) return res.status(404).send("No users found");
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// 2. Get a specific user
const getUser = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    if (!validate(user_id))
      return res.status(400).send("Bad request, invalid ID");
    console.log("1. getting user by id ", user_id);
    const user = await userModel.find({ user_id: user_id });
    if (!user) return res.status(404).send("user does not exist");
    console.log("2. getting user  ", user_id, user);
    return res.status(200).send({ user: user });
    // if (!user) return res.status(404).send("No user found");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

// 3. add a new user
const addUser = async (req, res) => {
  console.log(req.body);
  // const { roomReq } = req.body;
  const date = Date.now();
  if (req.body.details.dateAdded) date = req.body.dateAdded;
  //   console.log("date Added: ", date);
  const user = new userModel({
    user_id: req.body.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dateAdded: date,
  });
  try {
    await user.save();
    return res.status(201).json({ success: user });
  } catch (err) {
    return res.status(400).json({ Error: err });
  }
};

// 4. update an existing user
const updateUser = async (req, res) => {};

// 1. Delete a specific user by its id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id))
      return res.status(400).send("Bad request, invalide ID");
    let user = await userModel.findByIdAndDelete(id);
    console.log("request to delete user ", id, user);
    if (!user) return res.status(404).send("user does not exist");
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// 2. Delete all users
const deleteAllUsers = async (req, res) => {};

// const user = new userModel({
//   name: "room1",
//   category: "suite",
//   isActive: true,
//   details: {
//     description: "this is a very nice room",
//     price: 123,
//     discount: 5,
//     images: ["image1", "image2"],
//     phone: "97243424323",
//   },
// });

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
