const express = require("express");
const router = express.Router();
// const workerController = require("../controllers/workers.controller");
const accountsController = require("../controllers/accounts.controllers");

router

  // get a list of all users
  .get("/", (req, res) => {
    console.log("get request to fetch all accounts");
    // return res.send(accountsController.getAccounts());
    return res.status(200).json({ accounts: accountsController.getAccounts() });
  })
  // get accound by passposrt_id
  .get("/:accountId", (req, res) => {
    const id = req.params.accountId;
    if (!accountsController.validateID(id))
      return res.status(422).json("invalid data");
    console.log("returning account id", req.params.accountId);
    // find account
    const found = accountsController.getAccount(id);
    console.log("found account: ", found);
    if (found) return res.status(200).send(found);

    console.log("response not found");
    return res.status(404).send("account not found").end();
    // return res.sendStatus(404).json({ error: "account not found" });
  })
  .post("/", (req, res) => {
    console.log("post request to add user");
    const added = accountsController.addAccount(req.body);
    if (added) {
      return res.status(201).send("Added account");
    }
    return res.status(422).send("error in adding account");
    // console.log(req.body);
    // workerController.addWorker(req, res);

  });

module.exports = router;
