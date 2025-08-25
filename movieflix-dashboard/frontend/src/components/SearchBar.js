import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) onSearch(input);
  };

  return (
<div className="flex flex-col sm:flex-row gap-3 items-center">
  <input
    type="text"
    className="border border-gray-300 rounded p-2 w-full sm:w-80"
    placeholder="Search movies..."
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={e => e.key === 'Enter' && handleSearch()}
  />
  <button
    onClick={handleSearch}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    Search
  </button>
</div>

  );
};

export default SearchBar;
