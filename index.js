const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;
// const usersRoute = require("./routes/users.routes");
const accountsRoute = require("./routes/accounts.routes");
const usersRoute = require("./routes/users.routes");

// create application/x-www-form-urlencoded parser
const urlencodedParse = app.use(bodyParser.urlencoded({ extended: false }));

// create application/json parser
const jsonParse = app.use(bodyParser.json());

app.use("/bank/accounts", accountsRoute);
app.use("/bank/users", usersRoute);
// app.use("/bank/transactions/", transactionsRoute)

//connect to db with mongoose
const server =
  "mongodb+srv://Ayelet:" +
  "yiYM4cuIvlyGfJPL" +
  "@cluster0.a5o1n.mongodb.net/bank_db?retryWrites=true&w=majority/bank_db";
mongoose
  .connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected: mongodb:@cluster0.a5o1n.mongodb.net");
  });

app.get("/", (req, res) => {
  console.log("welcome GET request");
  res.status(200).send("Welcome to Bank of Cayman Islands");
});

app.listen(port, () => {
  console.log(`Bank Server listening at ${port}`);
});
