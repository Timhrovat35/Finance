import React from 'react';
import './Login.css';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    // Proceed with login logic
    // ...
  };

  return (
    <div className="login-page">
      <div className="add"></div>
      <div className="login-container">
        <div className="login-content">
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" className="input-field" />
            <input type="password" name="password" placeholder="Password" className="input-field" />
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="register-text">
            Don't have an account yet?
          </div>
          <a href="/register">
            <button className="register-button">Register</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
