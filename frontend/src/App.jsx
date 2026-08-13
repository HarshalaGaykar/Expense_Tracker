import { useEffect, useState } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserInfo from "./components/UserInfo.jsx";
import Summary from "./components/Summary.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import EditExpense from "./components/EditExpense.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      getAllExpenses();
    }
  }, [user]);

  const getAllExpenses = async () => {
    try {
      let url = "/api/expenses";
      const currentUserId = user ? (user._id || user.id) : null;
      if (currentUserId) {
        url += `?userId=${currentUserId}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      // STRICT FRONTEND FILTER (Fallback in case backend doesn't filter)
      if (currentUserId && Array.isArray(data)) {
        const filteredExpenses = data.filter(
          (expense) => expense.userId === currentUserId
        );
        setExpenses(filteredExpenses);
      } else {
        setExpenses(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      setMessage("Failed to load expenses");
    }
  };

  const totalAmount = expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);

  const logoutUser = () => {
    setUser(null);
    setExpenses([]);
    setMessage("Logout successful");
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <p className="subtitle">Simple MERN project</p>

      {user && (
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/add">Add Expense</Link>
        </nav>
      )}

      {message && <p className="message">{message}</p>}

      {user && <UserInfo user={user} logoutUser={logoutUser} />}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Summary expenses={expenses} totalAmount={totalAmount} />
                <ExpenseList
                  expenses={expenses}
                  setMessage={setMessage}
                  getAllExpenses={getAllExpenses}
                />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/add"
          element={
            user ? (
              <ExpenseForm
                setMessage={setMessage}
                getAllExpenses={getAllExpenses}
                user={user}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/edit/:id"
          element={
            user ? (
              <EditExpense
                setMessage={setMessage}
                getAllExpenses={getAllExpenses}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            !user ? (
              <Login setUser={setUser} setMessage={setMessage} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/register"
          element={
            !user ? (
              <Register setMessage={setMessage} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
