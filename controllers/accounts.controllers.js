// const data = require("../Databases/accounts.json");
// const users = require("../models/users.model");
const accounts = require("../models/accounts.model");
const fs = require("fs");
const accountModel = require("../models/accounts.model");
// const accounts = data.users;

// helper functions
const find = (id) => {
  console.log("searching for " + id);
  const acc = accounts.find((account) => account.passport_id === parseInt(id));
  console.log("found: " + acc);
  return acc;
};
///////////////////////////////////////////

// 1. Get all accounts
const getAccounts = async (req, res) => {
  try {
    console.log("Get all accounts from DB");
    const accounts = await accountModel.find({});
    if (!accounts) return res.status(404).send("No account found");
    return res.status(200).send({ accounts: accounts });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// const getAccount = (id) => {
//   console.log("Account: ", id);
//   const found = find(id);
//   return found;
// };

// 2. Get a specific account by id
const getAccount = async (req, res) => {
  const id = req.params.id;
  console.log("getting account  ", id);
  try {
    // TODO - Add validation here
    const account = await accountModel.find({ id });
    if (!account) return res.status(404).send("No account found");
    return res.status(200).send({ account: account });
  } catch (err) {
    return res.status(500).send(err);
  }
};

//Create a new Account
const createAccount = async (req, res) => {
  console.log(req.body);
  // const { roomReq } = req.body;
  const date = Date.now();
  if (req.body.details.dateAdded) date = req.body.details.dateAdded;
  console.log("date Added: ", date);
  const account = new accountModel({
    // name: req.body.name,
    // category: req.body.category,
    user_id: req.body.user_id,
    amount: req.body.amount,
    credit: req.body.credit,
    isActive: req.body.isActive,
  });
  try {
    await account.save();
    return res.status(201).json({ success: account });
  } catch (err) {
    return res.status(400).json({ Error: err });
  }
};

// Update an existing account
//TODO
const updateAccount = async (req, res) => {
  console.log("Updating account");
};

// Delete an account by its ID
const deleteAccount = async (req, res) => {
  const id = req.params.id;
  console.log("getting account  ", id);
  try {
    // TODO - Add validation here
    if (!validateID(id))
      res.status(400).send("Bad request, account id invalid");
    const account = await accountModel.findByIdAndDelete({ id });
    if (!account) return res.status(404).send("No account found");
    res.status(200).send({ success: account });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Delete all accounts
const deleteAllAccounts = async (req, res) => {
  console.log("deleting all accounts");
  try {
    const result = await accountModel.deleteMany({});
    console.log("Deleted ", result.deletedCount);
    if (!result) return res.status(404).send("No accounts found");
    res
      .status(200)
      .send("Successfully deleted " + result.deletedCount + " account");
  } catch (err) {
    return res.status(500).send(err);
  }
};
// const updateFile = () => {
//   fs.writeFileSync(
//     "./Databases/accounts.json",
//     JSON.stringify({ users: accounts }),
//     function (err) {
//       if (err) return false;
//       console.log("added new account and written to file");
//       return true;
//     }
//   );
// };

// const getActiveAccounts = (activeState) => {
//   retun(accounts.filter((account) => account.isActive === activeState));
// };

// // update creadit details
// const updateCredit = (id, newCredit) => {
//   const found = find(id);
//   if (!found) return false;
//   if (newCredit < 0) return false;
//   found.credit = newCredit;
//   updateFile();
//   return found;
// };

const validateID = (id) => {
  if (id < 0) return false;
  if (isNaN(id)) return false;
  return true;
};

// const createAccount = (newAccount) => {
//   console.log(newAccount.passport_id);
//   if (!newAccount) return false;
//   //if account already exists, return false
//   const found = find(newAccount.passport_id);
//   console.log("acount found? ", found);
//   if (found) return false;
//   const acc = {
//     passport_id: newAccount.passport_id,
//     first_name: newAccount.first_name,
//     last_name: newAccount.last_name,
//     cash: newAccount.cash,
//     credit: newAccount.credit,
//     isActive: true,
//   };
//   console.log(acc);
//   accounts.push(acc);
//   console.log(accounts);
//   updateFile();

//   return true;
// };

const deposit = (id, amount) => {
  if (isNaN(amount) || amount < 0)
    return { status: 422, error: "Invalid amount" };

  const found = find(id);
  if (!found) return { status: 204, error: "Invalid ID" };
  found.cash = parseInt(found.cash) + amount;
  updateFile();
  return { status: 200, success: found };
};

const withdraw = (id, amount) => {
  if (isNaN(amount) || amount < 0)
    return { status: 422, error: "Invalid amount" };

  const found = find(id);
  if (!found) return { status: 204, error: "Invalid ID" };

  // check if withdrawal does not exceed credit
  if (parseInt(found.cash) + parseInt(found.credit) > amount) {
    return { status: 403, error: "Forbidden: amounts excedes credit" };
  }

  found.cash = parseInt(found.cash) - amount;
  // do not forget to write to the file
  updateFile();
  return { status: 200, success: found };
};

const transferMoney = (srcId, destId, amount) => {
  if (isNaN(amount) || amount < 0)
    return { status: 422, error: "Invalid amount" };

  const srcFound = find(srcId);
  const destFound = find(destId);
  if (!srcFound || !destFound) return { status: 204, error: "Invalid ID" };
  const result1 = widthdraw(srcId, amount);
  if (result1.status != 200) return result1;
  const result2 = deposit(destId, amount);
  if (result2.status != 200) return result2;
  // success! update file and return
  updateFile();
  return { status: 200, success: [found1, found2] };
};

// module.exports = {
//   getAccounts,
//   getAccount,
//   updateCredit,
//   validateID,
//   addAccount,
//   deposit,
//   withdraw,
//   transferMoney,
// };

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  deleteAllAccounts,
};
