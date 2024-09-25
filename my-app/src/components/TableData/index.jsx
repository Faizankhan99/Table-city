import React from "react";

const CitiesTable = ({
  results,
  currentPage,
  citiesPerPage,
  loading,
  searchTerm,
}) => {
  return (
    <div className="table-container">
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : results.length > 0 ? (
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {results.map((city, index) => (
              <tr key={city.id}>
                <td>{(currentPage - 1) * citiesPerPage + index + 1}</td>
                <td>{city.name}</td>
                <td>
                  <img
                    src={`https://flagsapi.com/${city.countryCode}/shiny/24.png`}
                    alt={city.country}
                  />
                  {city.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-result">
          {searchTerm ? "No result found" : "Start searching"}
        </div>
      )}
    </div>
  );
};

export default CitiesTable;
