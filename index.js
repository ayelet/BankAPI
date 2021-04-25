const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5001;
// const usersRoute = require("./routes/users.routes");
const accountsRoute = require("./routes/accounts.routes");
const usersRoute = require("./routes/users.routes");
const config = require("./config/database");

// create application/x-www-form-urlencoded parser
const urlencodedParse = app.use(bodyParser.urlencoded({ extended: false }));

// create application/json parser
const jsonParse = app.use(bodyParser.json());

app.use("/bank/accounts", accountsRoute);
app.use("/bank/users", usersRoute);
// app.use("/bank/transactions/", transactionsRoute)

//connect to db with mongoose
const server = process.env.MONGODB_URI || config.database;
mongoose
  .connect(process.env.MONGODB_URI || config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected: mongodb:@cluster0.a5o1n.mongodb.net");
  });

mongoose.connection.on("error", (err) => {
  console.log("database error: ", err);
});

// set static folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/bank-frontend/build")));
}

app.get("/", (req, res) => {
  console.log("welcome GET request");
  res.status(200).send("Welcome to Bank of Cayman Islands");
});

app.listen(port, () => {
  console.log(`Bank Server listening at ${port}`);
});
