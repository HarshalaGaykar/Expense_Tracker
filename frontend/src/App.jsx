import { useEffect, useState } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserInfo from "./components/UserInfo.jsx";
import Summary from "./components/Summary.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllExpenses();
  }, []);

  const getAllExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      setMessage("Failed to load expenses");
    }
  };

  const totalAmount = expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);

  const logoutUser = () => {
    setUser(null);
    setMessage("Logout successful");
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <p className="subtitle">Simple MERN project</p>

      {message && <p className="message">{message}</p>}

      {user ? (
        <UserInfo user={user} logoutUser={logoutUser} />
      ) : showRegister ? (
        <Register
          setMessage={setMessage}
          setShowRegister={setShowRegister}
        />
      ) : (
        <Login
          setUser={setUser}
          setMessage={setMessage}
          setShowRegister={setShowRegister}
        />
      )}

      <Summary expenses={expenses} totalAmount={totalAmount} />

      <ExpenseForm
        setMessage={setMessage}
        getAllExpenses={getAllExpenses}
      />

      <ExpenseList
        expenses={expenses}
        setMessage={setMessage}
        getAllExpenses={getAllExpenses}
      />
    </div>
  );
}

export default App;
