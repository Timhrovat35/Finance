import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems';
import './Navbar.css';

function Navbar() {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(token);

  const handleLogout = async () => {
    if (isLoggedIn) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // No credentials, handle error or show message
          return;
        }

        const response = await fetch('http://localhost:8000/api/auth/logout/', {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 200) {
          // Logout success
          setIsLoggedIn(false);
          localStorage.removeItem('token'); // Remove token from local storage
          // Perform any additional actions after logout
        } else {
          console.log("fail",response.status)
          // Logout failed
          // Handle other status codes if needed
        }
      } catch (error) {
        console.error(error);
        // Handle any error that occurred during logout
      }
    } else {
      console.log("ops")
      // Perform any additional actions after login
    }
  };

  return (
    <>
      <nav className="sidebar">
        <h1 className="navbar-logo">FINANCE</h1>
        <ul className="nav-menu">
          {MenuItems.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <a href={item.url}>
                  <i className={item.icon}></i>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="login-logout">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
