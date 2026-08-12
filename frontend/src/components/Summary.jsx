function Summary({ expenses, totalAmount }) {
  return (
    <div className="summary">
      <p>Total Expenses: {expenses.length}</p>
      <p>Total Amount: Rs. {totalAmount}</p>
    </div>
  );
}

export default Summary;
