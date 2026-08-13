import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditExpense({ setMessage, getAllExpenses }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getExpense();
  }, [id]);

  const getExpense = async () => {
    try {
      const response = await fetch(`/api/expenses/${id}`);
      const data = await response.json();

      setExpenseName(data.expenseName);
      setAmount(data.amount);
      setDate(data.date.slice(0, 10));
      setDescription(data.description || "");
    } catch (error) {
      setMessage("Failed to load expense");
    }
  };

  const updateExpense = async (event) => {
    event.preventDefault();

    const updatedExpense = {
      expenseName,
      amount,
      date,
      description
    };

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedExpense)
      });

      const data = await response.json();

      setMessage(data.message);
      getAllExpenses();
      navigate("/");
    } catch (error) {
      setMessage("Failed to update expense");
    }
  };

  return (
    <div className="box">
      <h2>Edit Expense</h2>

      <form className="form" onSubmit={updateExpense}>
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

        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
}

export default EditExpense;
