import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import { TableItems } from '../TableItems';
import './Dashboard.css';

function Dashboard() {
  const [sortColumn, setSortColumn] = useState('transactionName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTableItems, setFilteredTableItems] = useState(TableItems);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    
    // Filter the table data based on the search term
    const filteredItems = TableItems.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredTableItems(filteredItems);
  };

  const handleSort = (column) => {
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

    if (sortColumn === 'total') {
      // Convert the values to numbers before comparison
      const aNumericValue = parseFloat(aValue.replace(',', '.'));
      const bNumericValue = parseFloat(bValue.replace(',', '.'));

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
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
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
        const total = parseFloat(item.total.replace(',', '.'));
        monthlySum += item.mode === 'expenses' ? -total : total;
      }
    });

    return monthlySum !== null ? monthlySum.toFixed(2) : '----';
  };

  useEffect(() => {
    const updatedMonthlySum = calculateMonthlySum();
  }, [filteredTableItems]);

  const calculateTotalSum = () => {
    let totalSum = null;

    filteredTableItems.forEach((item) => {
      const total = parseFloat(item.total.replace(',', '.'));
      totalSum += item.mode === 'expenses' ? -total : total;
    });

    return totalSum !== null ? totalSum.toFixed(2) : '----';
  };
  useEffect(() => {
  }, [filteredTableItems]);


  return (
    <div style={{ marginLeft: '240px',marginRight:"40px", }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ marginLeft: 'auto', width: '50vw', marginTop:'6vh' }}>
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
          <h1 style={{ marginTop: '0px' }}>{calculateTotalSum()}  EUR</h1>
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
              <td>{item.transactionName}</td>
              <td>{item.date}</td>
              <td>{item.payment}</td>
              <td>{item.total}</td>
              <td>{item.mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
