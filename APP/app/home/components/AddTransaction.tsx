"use client";
import React, { useState } from "react";
import classes from "../styles/addTransaction.module.css";
import { useAppContext } from "../../AppContext";

export default function AddTransaction() {
  const globalState = useAppContext();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newTransactionResponse = await fetch("http://localhost:3000/api/auth/transaction", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${globalState?.auth?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, amount, startDate }),
      });

      if (!newTransactionResponse.ok) {
        throw new Error("Failed to create transaction");
      }

      // Clear input fields after transaction creation.
      const newTransaction = await newTransactionResponse.json();
      setName("");
      setAmount("");
      setStartDate("");
      globalState?.addTransaction(newTransaction);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <form className={classes["transaction-form"]} onSubmit={onSubmit}>
      <div>
        <label htmlFor="text" className={classes["form-label"]}>
          {("name")}
        </label>
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          id="text"
          placeholder={("enterName")}
          className={classes["form-input"]}
        />
      </div>
      <div>
        <label htmlFor="amount" className={classes["form-label"]}>
          {("amount")}
        </label>
        <input
          value={amount}
          onChange={handleChangeAmount}
          type="text"
          id="amount"
          placeholder={("enterAmount")}
          className={classes["form-input"]}
        />
      </div>
      <div>
        <label htmlFor="startDate" className={classes["form-label"]}>
          {("startDate")}
        </label>
        <input
          value={startDate}
          onChange={handleChangeStartDate}
          type="date"
          id="startDate"
          placeholder={("enterStartDate")}
          className={classes["form-input"]}
        />
      </div>
      <button type="submit" className={classes["form-button"]}>
        {("addTransaction")}
      </button>
    </form>
  );
}
