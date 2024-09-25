import React from "react";

const Pagination = ({
  currentPage,
  totalCities,
  citiesPerPage,
  handlePageChange,
  handleCitiesPerPageChange,
}) => {
  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>Page {currentPage}</span>

      <button
        disabled={currentPage * citiesPerPage >= totalCities}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>

      <div className="cities-limit">
        <label>
          Cities per page:
          <input
            type="number"
            value={citiesPerPage}
            onChange={handleCitiesPerPageChange}
            min="1"
            max="10"
          />
        </label>
      </div>
    </div>
  );
};

export default Pagination;
