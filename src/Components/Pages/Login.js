import React from 'react';
import './Login.css';

function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
        const { token } = await response.json();
        // Login success
        alert("Login successful!");
        console.log("Token:", token);
        // Store the token in localStorage or a secure storage mechanism
        // Redirect to the authenticated area or perform further actions
        localStorage.setItem('token', token);
        window.location.href = '/'; // Redirect to the home page
      } else if (response.status === 400) {
        // Login failed
        alert("Login failed");
      } else {
        // Handle other status codes
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
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
