import { useState } from "react";

function ExpenseForm({ setMessage, getAllExpenses }) {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const addExpense = async (event) => {
    event.preventDefault();

    const newExpense = {
      expenseName,
      amount,
      date,
      description
    };

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
      });

      const data = await response.json();

      setMessage(data.message);
      setExpenseName("");
      setAmount("");
      setDate("");
      setDescription("");
      getAllExpenses();
    } catch (error) {
      setMessage("Failed to add expense");
    }
  };

  return (
    <div className="box">
      <h2>Add Expense</h2>

      <form className="form" onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense name"
          value={expenseName}
          onChange={(event) => setExpenseName(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
