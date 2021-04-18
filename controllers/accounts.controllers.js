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

const updateFile = () => {
  fs.writeFileSync(
    "./Databases/accounts.json",
    JSON.stringify({ users: accounts }),
    function (err) {
      if (err) return false;
      console.log("added new account and written to file");
      return true;
    }
  );
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
  if (newCredit < 0) return false;
  found.credit = newCredit;
  updateFile();
  return found;
};

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
  updateFile();

  return true;
};

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

module.exports = {
  getAccounts,
  getAccount,
  updateCredit,
  validateID,
  addAccount,
  deposit,
  withdraw,
  transferMoney,
};
