import React, { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { formatter } from "../utils";

const ExpenseTracker = ({ batch, faculty, college, expenses }) => {
  const [entries, setEntries] = useState(expenses||[]);

  const [expense, setExpense] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const expenseRef = useRef(null);
  const dateRef = useRef(null);
  const amountRef = useRef(null);

  const handlePressEnterAtName = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      dateRef.current.focus();
    }
  };

  const handlePressEnterAtDOB = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      amountRef.current.focus();
    }
  };

  const handlePressEnterAtAddress = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      handleAddEntry();
    }
  };

  const handleAddEntry = () => {
    if (!editMode) {
      setEntries([
        ...entries,
        {
          id: entries.length + 1,
          expense: expense,
          date: date,
          amount: amount,
        },
      ]);
    } else {
      setEntries(
        entries.map((en) =>
          en.id === selectedEntry.id ? { ...en, expense, date, amount } : en
        )
      );
      setEditMode(false);
      setSelectedEntry(null);
    }
    setExpense("");
    setDate("");
    setAmount("");
    expenseRef.current.focus();
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((a) => a.id !== id));
  };

  const handleEditEntry = (entry) => {
    setEditMode(true);
    setSelectedEntry(entry);
    setExpense(entry.expense);
    setDate(entry.date);
    setAmount(entry.amount);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedEntry(null);
    setExpense("");
    setDate("");
    setAmount("");
    expenseRef.current.focus();
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ul>
        {entries.map((s) => (
          <li
            key={s.id}
            className={selectedEntry?.id === s.id ? "selected-entry" : ""}
          >
            <span>{s.id} </span>
            <span>{s.expense}</span>
            <span>{s.date}</span>
            <span>{formatter.format(s.amount)}</span>
            <AiTwotoneEdit
              color="blue"
              size={15}
              onClick={() => handleEditEntry(s)}
            />
            <FaTrash
              color="red"
              size={15}
              onClick={() => handleRemoveEntry(s.id)}
            />
          </li>
        ))}
        <li>
            <span>Total - </span><span>{formatter.format(entries.reduce((a,v)=>a + +v.amount,0))}</span></li>
      </ul>
      <button onClick={() => setEntries([])}>Clear All</button>
      <input
        placeholder="Enter DOB"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        ref={dateRef}
        type="date"
        onKeyUp={handlePressEnterAtDOB}
      />
      <input
        placeholder="Enter expense"
        onChange={(e) => setExpense(e.target.value)}
        value={expense}
        ref={expenseRef}
        onKeyUp={handlePressEnterAtName}
      />
      
      <input
        placeholder="Enter Amount"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        type="number"
        ref={amountRef}
        onKeyUp={handlePressEnterAtAddress}
      />
      <button onClick={handleAddEntry}>{editMode ? "Save" : "+Add"}</button>
      {editMode ? <button onClick={handleCancelEdit}>Cancel</button> : null}

    </div>
  );
};

export default ExpenseTracker;
