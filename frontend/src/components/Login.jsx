import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUser, setMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        navigate("/");
      }

      setMessage(data.message);
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>

      <form className="form" onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <Link className="link-button" to="/register">
        New user? Register
      </Link>
    </div>
  );
}

export default Login;
