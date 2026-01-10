import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const searchNovels = () => {
    console.log("Searching novels for:", searchQuery);
    // Additional logic for searching can go here
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchNovels(); // Trigger search logic
      navigate(`/SearchResultLayout/${searchQuery}`); // Navigate programmatically
      setSearchQuery("");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        id="searchInput"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} // Attach the keydown event
        placeholder="Search novels..."
      />

      <Link to={`/SearchResultLayout/${searchQuery}`}>
        <button id="searchButton" onClick={searchNovels}>Search</button>
      </Link>
    </div>
  );
};

export default SearchBar;
