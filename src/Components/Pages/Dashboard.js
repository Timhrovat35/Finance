import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';
import { TableItems } from '../TableItems';
import './Dashboard.css';

function Dashboard() {
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTableItems, setFilteredTableItems] = useState(TableItems);
  const [accountId, setAccountId] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm === ''){
      setFilteredTableItems(filteredTableItems)
    }else{
        const searchItems = filteredTableItems.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredTableItems(searchItems);
    }
    // Filter the table data based on the search term
  };
  
  const handleSort = (column) => {
    console.log("jasjasjasjasj", column, sortColumn, sortDirection)
    if (sortColumn === column) {
      // If the same column is clicked again, toggle the sort direction
      setSortDirection((prevSortDirection) =>
        prevSortDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      // If a different column is clicked, set the new sort column and direction
      setSortColumn(column);
      setSortDirection('asc');
    }
    
  };

  // Sort the table data based on the current sort column and direction
  const sortedTableItems = filteredTableItems.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    console.log(bValue, aValue)
    if (sortColumn === 'total') {
      // Convert the values to numbers before comparison
      const aNumericValue = parseFloat();
      const bNumericValue = parseFloat();
      console.log(bNumericValue)
      if (sortDirection === 'asc') {
        return aNumericValue - bNumericValue;
      } else {
        return bNumericValue - aNumericValue;
      }
    } else if (sortColumn === 'date') {
      // Convert the values to Date objects before comparison
      const aDateValue = new Date(aValue);
      const bDateValue = new Date(bValue);

      if (sortDirection === 'asc') {
        return aDateValue.getTime() - bDateValue.getTime();
      } else {
        return bDateValue.getTime() - aDateValue.getTime();
      }
    } else {
      if (sortDirection === 'asc') {
       // return aValue.localeCompare(bValue);
      } else {
       // return bValue.localeCompare(aValue);
      }
    }
    
  });
  

  // Calculate the sum of totals for the ongoing month
  const calculateMonthlySum = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let monthlySum = null;

    filteredTableItems.forEach((item) => {
      const itemDate = new Date(item.date);
      const itemMonth = itemDate.getMonth();
      const itemYear = itemDate.getFullYear();

      if (itemMonth === currentMonth && itemYear === currentYear) {
        const total = parseFloat(item.amount);
        monthlySum += item.transaction_type === 'expenses' ? -total : total;
      }
    });

    return monthlySum !== null ? monthlySum.toFixed(2) : '----';
  };


  const calculateTotalSum = () => {
    let totalSum = null;

    filteredTableItems.forEach((item) => {
      const total = parseFloat(item.amount);
      totalSum += item.transaction_type=== 'expenses' ? -total : total;
    });

    return totalSum !== null ? totalSum.toFixed(2) : '----';
  };

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
        console.log(accountId, "ajjjjj");
  
        // Make the API request to fetch the account transactions
        fetch(`http://localhost:8000/api/account/${account.id}/transactions/`, {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log(accountId)
              return response.json();
            } else if (response.status === 404) {
              throw new Error('Account transactions not found');
            } else {
              throw new Error('Failed to fetch account transactions');
            }
          })
          .then((data) => {
            console.log(data)
            // Update the filteredTableItems state with the received data
            setFilteredTableItems(data);
          })
          .catch((error) => {
            console.error('Error fetching account transactions:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching account details:', error);
      });
  }, []);
  

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token is present in localStorage
    if (!token) {
      return;
    }

    // Make the API request to fetch the account details
    
  }, []);

  if (!localStorage.getItem('token')) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div>You need to login first.</div>
        <Link to="/login" className='login-btn'>
          <button>Login</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div style={{ marginLeft: '240px', marginRight: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginLeft: 'auto', width: '50vw', marginTop: '6vh' }}>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: '50px' }}>
          <div className='info-box'>
            <h3>Monthly Difference</h3>
            <h1 style={{ marginTop: '0px' }}>{calculateMonthlySum()} EUR</h1>
          </div>
          <div className='info-box' style={{ marginLeft: '40px', width: 'auto' }}>
            <h3>Total</h3>
            <h1 style={{ marginTop: '0px' }}>{calculateTotalSum()} EUR</h1>
          </div>
          <div style={{ marginLeft: '40px', width: 'auto', alignSelf:'center' }}>
            <Link to="/add" >
              <div className='add-button'>
                <button >ADD</button>
                
              </div>
            </Link>
          </div>
        </div>
        <table className='transaction-table'>
          <thead>
            <tr>
              <th onClick={() => handleSort('transactionName')}>Transaction name</th>
              <th onClick={() => handleSort('date')}>Date</th>
              <th onClick={() => handleSort('payment')}>Payment</th>
              <th onClick={() => handleSort('total')}>Total</th>
              <th onClick={() => handleSort('mode')}>Income/Expenses</th>
            </tr>
          </thead>
          <tbody>
            {sortedTableItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.payment_method}</td>
                <td>{item.amount}</td>
                <td>{item.transaction_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;
