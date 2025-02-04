"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import IncomeExpense from "./components/IncomeExpense";
import AddTransaction from "./components/AddTransaction";
import History from "./components/History";
import classes from "./home.module.css"; // Import the CSS module

type Props = {};

async function getTransactions(token?: string) {
  const response = await fetch("http://localhost:3000/api/auth/transaction", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Failed to fetch transactions");
    return [];
  }
  const transactions = await response.json();
  return transactions;
}

export default function HomePage() {
  const globalState = useAppContext();
  const auth = globalState?.auth;
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions when the component mounts
  useEffect(() => {
    if (auth?.token) {
      getTransactions(auth.token).then((data) => setTransactions(data));
    }
  },[]);

  return (
    <div className={classes["dashboard-layout"]}>
      <div className={classes["dashboard-body"]}>
        <h1 className={classes["dashboard__title"]}>Dashboard</h1>
        <div className={classes["dashboard__balance-container"]}>
          <h2 className={classes["dashboard__balance-title"]}>Balance</h2>
          <p className={classes["dashboard__balance-price"]}>$0.00</p>
        </div>
        <div className={classes["dashboard__transaction-container"]}>
          <h2 className={classes["dashboard__transaction-title"]}>Add Transaction</h2>
          <AddTransaction />
        </div>
        <div className={classes["dashboard__history-container"]}>
          <h2 className={classes["dashboard__history-title"]}>Transaction History</h2>
          <History transactions={transactions} />
        </div>
        <div className={classes["dashboard__history-transaction-container"]}>
          <a href="/graph" className={classes["dashboard__graph-link"]}>View Graph</a>
        </div>
      </div>
    </div>
  );
}
