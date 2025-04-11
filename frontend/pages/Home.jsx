import React, { useState } from 'react';
import axios from 'axios';
// import './Home.css'; // Import the CSS file

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role
      });
      alert('Registration successful!');
      setEmail('');
      setPassword('');
      setRole('user');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = '/admin';
    } catch (error) {
      setErrorMessage(error.response.data || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="auth-input"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="auth-input"
      />

      {!isLogin && (
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="auth-input"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button className="auth-btn" onClick={isLogin ? handleLogin : handleRegister}>
        {isLogin ? "Login" : "Register"}
      </button>

      {errorMessage && <p className="error-msg">{errorMessage}</p>}

      <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default Home;
