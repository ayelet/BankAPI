const express = require("express");
const router = express.Router();
// const workerController = require("../controllers/workers.controller");
const accountsController = require("../controllers/accounts.controllers");

router

  // get a list of all users
  .get("/", (req, res) => {
    console.log("get request to fetch all accounts");
    // return res.send(accountsController.getAccounts());
    return res.status(200).json({ users: accountsController.getAccounts() });
  })
  // get rid of the annoying favicon request
  .get("/favicon.ico", (req, res) => {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    console.log("favicon requested");
    return;
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
  })
  .put("/setCredit/:id/:credit", (req, res) => {
    console.log("setting new credit:", req.params.id, req.params.credit);
    // const { id, credit } = req.params;
    const result = accountsController.updateCredit(
      req.params.id,
      req.params.credit
    );
    if (!result) return res.status(422).send("illegal action");
    return res.status(200).send({ account: result });
  })
  .put("/deposit/:id/:amount", (req, res) => {
    console.log("Depostining request:", req.id, req.amount);
    const result = accountsController.deposit(
      req.params.id,
      parseInt(req.params.amount)
    );
    if (result.status != 200)
      return res.status(result.status).send(result.error);

    return res.status(result.status).send(result.success);
  })
  .put("/withdrawal/:id/:amount", (req, res) => {
    console.log("Withdrawal request:", req.id, req.amount);
    const result = accountsController.withdraw(
      req.params.id,
      parseInt(req.params.amount)
    );
    if (result.status != 200)
      return res.status(result.status).send(result.error);

    return res.status(result.status).send(result.success);
  })
  .put("/transfer/:src_id/:dest_id/:amount", (req, res) => {
    console.log("trasnfer request", req.params.src_id, req.params.dest_id);
    const result = accountsController.transferMoney(
      req.params.src_id,
      req.params.dest_id,
      parseInt(req.params.amount)
    );
    if (result.status != 200)
      return res.status(result.status).send(result.error);

    return res.status(result.status).send(result.success);
  });

module.exports = router;
