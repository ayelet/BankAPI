const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");

router

  // get a list of all users
  .get("/", (req, res) => {
    console.log("get request to fetch all users");
    usersController.getUsers(res);
    // return res.send(usersController.getAccounts());
    // return res.status(200).json({ users: usersController.getUsers() });
  })
  .get("/:id", (req, res) => {
    console.log("Get user by id", req.params.id);
    usersController.getUser(req, res);
  })
  .post("/add", (req, res) => {
    console.log("Add user", req.body);
    usersController.addUser(req, res);
  })
  .put("/update/:id", (req, res) => {
    console.log("Update existing user", req.params.id);
    usersController.updateUser(req, res);
  })
  .delete("/:id", (req, res) => {
    console.log("Delete user ", req.params.id);
    usersController.deleteUser(req, res);
  })
  .delete("/deleteAll", (req, res) => {
    console.log("Delete all users request");
    usersController.deleteAllUsers(req, res);
  });

module.exports = router;
