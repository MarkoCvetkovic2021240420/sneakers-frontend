import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Import CSS for styling

function Login({ setIsLoggedIn, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      alert("Login successful");
      localStorage.setItem("token", response.data.token);

      // Izdvajamo korisničku ulogu iz tokena
      const token = response.data.token;
      const user = JSON.parse(atob(token.split(".")[1]));
      setUserRole(user.role); // Ažuriramo ulogu korisnika u stanju aplikacije

      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error); // Logovanje greške
      alert(error.response.data.error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
