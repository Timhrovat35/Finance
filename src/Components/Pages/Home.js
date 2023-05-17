import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <div className="content">
        <h1>Finance</h1>
        <p>
          This intuitive and user-friendly platform allows you to effortlessly manage your account transactions.
          With our Dashboard feature, you can view and search through your transaction history, sort them by different criteria,
          and quickly calculate monthly and total sums.
        </p>
        <p>
          Need to add a new transaction? Our Add page provides a simple form for entering transaction details.
          Stay in control of your finances with our powerful yet easy-to-use financial application.
        </p>
      </div>
    </div>
  );
}

export default Home;
