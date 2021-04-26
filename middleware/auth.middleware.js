const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismysecret");
    console.log(decoded);
    console.log("searching for token ", token, decoded);
    const user = await userModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    console.log("User is ", user);
    if (!user) throw new Error("unrecognized token", token);

    req.token = token; // save this token so the user can log out from one of her devices
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
