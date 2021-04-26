const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;
// const usersRoute = require("./routes/users.routes");
const accountsRoute = require("./routes/accounts.routes");
const usersRoute = require("./routes/users.routes");
const config = require("./config/database");

// create application/x-www-form-urlencoded parser
const urlencodedParse = app.use(bodyParser.urlencoded({ extended: false }));

// add middleware for user authentication here
app.use((req, res, next) => {
  console.log(req.method, req.path);

  next();
});

// add middleware for maintenance mode
const isMaintenanceMode = false;
app.use((req, res, next) => {
  if (isMaintenanceMode)
    return res.status(503).send("Site is currently down. Check back soon!");
  next();
});
app.use(cors());
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
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// app.get("/", (req, res) => {
//   console.log("welcome GET request");
//   res.status(200).send("Welcome to Bank of Cayman Islands");
// });

// const myfunction = async () => {
//   const token = jwt.sign({ __id: "administrator" }, "mysecretstring", {
//     expiresIn: "1 day",
//   });
//   console.log("Token: ", token);

//   // Verify your token by taking the secret
//   const data = jwt.verify(token, "mysecretstring");
//   console.log(data);
// };

// myfunction();

app.listen(port, () => {
  console.log(`Bank Server listening at ${port}`);
});
