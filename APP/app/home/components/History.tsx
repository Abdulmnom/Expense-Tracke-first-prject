import React from "react";
import classes from "../styles/history.module.css";
import { Transaction } from "../../types/transaction";
import HistoryItem from "./HistoryItem";

type Props = {
  transactions: Transaction[];
};

export default function History({ transactions }: Props) {

  // Sort transactions by startDate
  const sortedTransactions = transactions?.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className={classes["history-container"]}>
      {sortedTransactions?.map((transaction) => (
        <HistoryItem key={transaction._id} {...transaction} />
      ))}
    </div>
  );
}
