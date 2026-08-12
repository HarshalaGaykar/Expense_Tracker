import { useState } from "react";

function Register({ setMessage, setShowRegister }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    const newUser = {
      fullName,
      username,
      email,
      password
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();

      setMessage(data.message);
      setShowRegister(false);
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="box">
      <h2>Register</h2>

      <form className="form" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

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

        <button type="submit">Register</button>
      </form>

      <button className="link-button" onClick={() => setShowRegister(false)}>
        Already have account? Login
      </button>
    </div>
  );
}

export default Register;
