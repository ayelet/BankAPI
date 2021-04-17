const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
// const usersRoute = require("./routes/users.routes");
const acountsRoute = require("./routes/acounts.routes");

// create application/x-www-form-urlencoded parser
const urlencodedParse = app.use(bodyParser.urlencoded({ extended: false }));

// create application/json parser
const jsonParse = app.use(bodyParser.json());

app.use("/api/accounts", acountsRoute);

app.listen(port, () => {
  console.log(`Bank Server listening at ${port}`);
});
