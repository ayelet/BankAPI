const data = require("../Databases/accounts.json");
const fs = require("fs");
const accounts = data.users;

// helper functions
const find = (id) => {
  console.log("searching for " + id);
  const acc = accounts.find((account) => account.passport_id === parseInt(id));
  console.log("found: " + acc);
  return acc;
};
///////////////////////////////////////////
// console.log(users);
const getAccounts = () => {
  console.log(accounts);
  return accounts;
};

const getAccount = (id) => {
  console.log("Account: ", id);
  const found = find(id);
  return found;
};
const getActiveAccounts = (activeState) => {
  retun(accounts.filter((account) => account.isActive === activeState));
};

// update creadit details
const updateCredit = (id, newCredit) => {
  const found = find(id);
  if (!found) return false;
  if (newcredit < 0) return false;
  found.credit = newCredit;
  return found;
};

const withdraw = (id, amount) => {};

const transferMoney = (srcId, destId, amount) => {};

const validateID = (id) => {
  if (id < 0) return false;
  if (isNaN(id)) return false;
  return true;
};

const addAccount = (newAccount) => {
  console.log(newAccount.passport_id);
  if (!newAccount) return false;
  //if account already exists, return false
  const found = find(newAccount.passport_id);
  console.log("acount found? ", found);
  if (found) return false;
  const acc = {
    passport_id: newAccount.passport_id,
    first_name: newAccount.first_name,
    last_name: newAccount.last_name,
    cash: newAccount.cash,
    credit: newAccount.credit,
    isActive: true,
  };
  console.log(acc);
  accounts.push(acc);
  console.log(accounts);
  fs.writeFileSync(
    "./Databases/accounts.json",
    JSON.stringify(accounts),
    function (err) {
      if (err) return false;
      console.log("added new account and written to file");
      return true;
    }
  );
  fs.readdir("./", (err, files) => {
    if (err) console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach((file) => {
        console.log(file);
      });
    }
  });
  return true;
};
/*
fs.writeFile("hello_renamed.txt", "Hello content!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});*/

module.exports = {
  getAccounts,
  getAccount,
  updateCredit,
  validateID,
  addAccount,
  //   getWorkers,
  //   getWorkerById,
};
