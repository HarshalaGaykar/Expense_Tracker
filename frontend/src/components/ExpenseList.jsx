function ExpenseList({ expenses, setMessage, getAllExpenses }) {
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      setMessage(data.message);
      getAllExpenses();
    } catch (error) {
      setMessage("Failed to delete expense");
    }
  };

  return (
    <div className="box">
      <h2>Expense List</h2>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.expenseName}</td>
                <td>Rs. {expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.description}</td>
                <td>
                  <button onClick={() => deleteExpense(expense._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;
