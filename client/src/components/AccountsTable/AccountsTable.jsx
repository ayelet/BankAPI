import "./Accounts.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountsTable = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    // effect
    const baseUrl = "http://localhost:5001/bank/users/";
    // const baseUrl = "https://bank-backend1.herokuapp.com/api/accounts/";
    try {
      axios.get(baseUrl).then(function (response) {
        // console.log(response);
        setAccounts(response.data);
        // console.log(accounts);
      });
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>Users Accounts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Cash</th>
            <th>Credit</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => {
            return (
              <tr key={account.user_id}>
                <td>{account.user_id}</td>
                <td>{account.first_name}</td>
                <td>{account.last_name}</td>
                <td>{account.cash}</td>
                <td>{account.credit}</td>
                <td>{account.isActive ? "True" : "False"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable;
