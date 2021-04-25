const express = require("express");
const router = express.Router();
// const workerController = require("../controllers/workers.controller");
const accountsController = require("../controllers/accounts.controllers");

router

  // get a list of all users
  .get("/", (req, res) => {
    console.log("get request to fetch all accounts");
    accountsController.getAccounts(req, res);
    // return res.send(accountsController.getAccounts());
    // return res.status(200).json({ accounts: accountsController.getAccounts() });
  })
  // get rid of the annoying favicon request
  .get("/favicon.ico", (req, res) => {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    console.log("favicon requested");
    return;
  })
  // get account by account_id
  .get("/:id", (req, res) => {
    accountsController.getAccount(req, res);
  })
  .post("/", (req, res) => {
    console.log("post request to add user");
    accountsController.createAccount(req, res);
    // const added = accountsController.createAccount(req, res);
    // if (added) {
    //   return res.status(201).send("Added account");
    // }
    // return res.status(422).send("error in adding account");
    // // console.log(req.body);
    // // workerController.addWorker(req, res);
  })
  .put("/:id", (req, res) => {
    console.log("Update account request");
    accountsController.updateAccount(req, res);
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
