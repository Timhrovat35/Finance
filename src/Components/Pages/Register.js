import React from 'react';
import './Register.css';

function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      username: username,
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status === 201) {
        // Registration success
        alert("Registration successful!");
      } else if (response.status === 400) {
        // Registration failed
        alert("Registration failed");
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
          <h2 className="login-title">Register</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Select E-mail" className="input-field" />
            <input type="text" name="username" placeholder="Select username" className="input-field" />
            <input type="password" name="password" placeholder="Select password" className="input-field" />
            <input type="password" name="confirmPassword" placeholder="Confirm password" className="input-field" />
            <button type="submit" className="login-button">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
