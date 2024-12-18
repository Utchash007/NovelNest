import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import SearchResultLayout from "../Layout/SearchResultLayout";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const[searchNovel, setSearchNovel]=useState([]);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const searchNovels = () => {
    console.log("Searching novels for:", searchQuery);
    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchNovels(); // Trigger search when Enter key is pressed
      setSearchQuery(e.target.value); // Programmatically trigger button click to navigate
    }
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

      <Link to={`/SearchResultLayout/${searchQuery}`}>
      <button id="searchButton" onClick={searchNovels}>Search</button>
      </Link>
      
    </div>
  );
};

export default SearchBar;
