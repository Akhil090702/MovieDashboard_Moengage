import React from 'react';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
const sortOptions = ['rating', 'year'];

const Filters = ({ onGenreChange, onSortChange }) => {
  return (
<div className="flex flex-col sm:flex-row gap-4 mt-4">
  <select onChange={e => onGenreChange(e.target.value)} className="border p-2 rounded w-full sm:w-60">
    <option value="">All Genres</option>
    {genres.map(g => <option key={g} value={g}>{g}</option>)}
  </select>

  <select onChange={e => onSortChange(e.target.value)} className="border p-2 rounded w-full sm:w-60">
    <option value="">Sort By</option>
    {sortOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
  </select>
</div>

  );
};

export default Filters;
