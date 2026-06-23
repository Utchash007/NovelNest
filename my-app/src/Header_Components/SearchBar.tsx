import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        id="searchInput"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search novels..."
      />
      <Link to={`/search/${searchQuery}`}>
        <button id="searchButton">Search</button>
      </Link>
    </div>
  );
};

export default SearchBar;
