import React, {useState} from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', }}>
      <input
        type="text"
        placeholder="Search"
        style={{
          padding: '8px',
          border: 'none',
          borderRadius: '4px',
          marginRight: '10px',
          width:'40%',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '8px 16px',
          backgroundColor: '#f0f0f0',
          border: 'none',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
    
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
