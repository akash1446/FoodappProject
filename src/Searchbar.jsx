import React from "react";
import "./SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-wrapper">
      {/* SEARCH ICON */}
      <span className="search-icon">🔍</span>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Search delicious food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
