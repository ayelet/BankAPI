const roomModel = require("../db/model");

// 1. Get all rooms
const getRooms = async (res) => {
  const rooms = await roomModel.find({});

  try {
    if (!rooms) return res.status(404).send("No rooms found");
    return res.status(200).send(rooms);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// 2. Get a specific product
const getRoom = async (name) => {
  console.log("getting room  ", name);
  try {
    // TODO - Add validation here
    await roomModel.find({ name: name }).then((room) => room);
    if (!room) return res.status(404).send("No room found");
  } catch (err) {
    return res.status(500).send(err);
  }
};

// 3. Get products that are active
const getActive = async (req, res) => {
  const activeState = req.params.state ? req.params.state : true;
  await roomModel.find({ isActive: activeState }).then((rooms) => {
    res.json({ success: rooms });
    console.log(rooms);
  });
};
//  4. Get products with a specific price range
const getPrice = async (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  if (!min || !max)
    return res.status(400).json({ error: "min or max must be specified" });
  if (min < 0 || max < 0)
    return res
      .status(400)
      .json({ error: "range limits must be positive numbers" });
  try {
    const rooms = await roomModel.find({
      "details.price": { $gt: min, $lt: max },
    });
    return res.status(200).send(rooms);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// add rooms
const createRoom = async (req, res) => {
  console.log(req.body);
  // const { roomReq } = req.body;
  const date = Date.now();
  if (req.body.details.dateAdded) date = req.body.details.dateAdded;
  console.log("date Added: ", date);
  const room = new roomModel({
    name: req.body.name,
    category: req.body.category,
    isActive: req.body.isActive,
    details: req.body.details,
  });
  try {
    await room.save();
    return res.status(201).json({ success: room });
  } catch (err) {
    return res.status(400).json({ Error: err });
  }
};

// update a product to become active/not active and change
// the value of its discount.
const updateRoom = async (req, res) => {};

// 1. Delete a specific product by its id
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    let room = await roomModel.findByIdAndDelete(id);
    console.log("request to delete room ", id, room);
    if (!room) return res.status(400).send("Room does not exist");
    return res.status(201).send(room);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// 2. Delete all products
const deleteAll = async (req, res) => {};

// const room = new roomModel({
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
  getAll: getRooms,
  getRoom,
  create: createRoom,
  getActive,
  getPrice,
  updateRoom,
  deleteRoom,
  deleteAll,
};
