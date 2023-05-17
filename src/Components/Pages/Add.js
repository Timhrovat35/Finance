import React, { useState, useEffect } from 'react';
import './Add.css';

function Add() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [accountId, setAccountId] = useState('');

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token is present in localStorage
    if (!token) {
      return;
    }

    fetch('http://localhost:8000/api/account/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error('Account not found');
        } else {
          throw new Error('Failed to fetch account details');
        }
      })
      .then((data) => {
        const account = data;
        setAccountId(account.id);
      });
  }, []);

  const handleAddTransaction = () => {
    const token = localStorage.getItem('token');
    // Prepare the transaction data object
    const transactionData = {
      name: name,
      amount: amount,
      date: date,
      payment_method: paymentMethod,
      transaction_type: transactionType,
    };
    // Make the API call to create the transaction
    fetch(`http://localhost:8000/api/account/${accountId}/transactions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => {
        if (response.ok) {
          // Transaction created successfully
          console.log('Transaction created successfully');
          // Reset the form inputs
          setName('');
          setAmount('');
          setDate('');
          setPaymentMethod('');
          setTransactionType('');
        } else {
          throw new Error('Failed to create transaction');
        }
      })
      .catch((error) => {
        console.error('Error creating transaction:', error);
      });
  };

  return (
    <div className="add-container">
      <h2>Add Transaction</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="">Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="credit_card">Credit card</option>
          <option value="debitt_card">Debit card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="other">others</option>
        </select>
      </div>
      <div className="form-group">
        <label>Transaction Type:</label>
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="">Select Transaction Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button className="add-buttona" onClick={handleAddTransaction}>Add</button>
    </div>
  );
}

export default Add;
