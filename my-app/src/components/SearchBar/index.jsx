import React, { useRef, useEffect } from "react";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        searchInputRef.current.focus();
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div class="search-container">
          <input
            type="text"
            class="search-input"
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchInputRef}
          />
          <button class="shortcut-button">Ctrl + /</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
