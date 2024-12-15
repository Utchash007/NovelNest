import React, { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const searchNovels = () => {
    console.log("Searching novels for:", searchQuery);
    // Implement search functionality here
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        id="searchInput"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search novels..."
      />
      <button onClick={searchNovels}>Search</button>
    </div>
  );
};

export default SearchBar;
