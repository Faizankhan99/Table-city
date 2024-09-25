import React, { useState } from "react";

import axios from "axios";
import "./Table.css";
import Pagination from "../pagination";
import CitiesTable from "../TableData";
import SearchBar from "../SearchBar";
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const SearchCities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage, setCitiesPerPage] = useState(5);
  const [totalCities, setTotalCities] = useState(0);

  const fetchCities = async (searchTerm, citiesPerPage, currentPage) => {
    setLoading(true);

    const options = {
      method: "GET",
      url: apiUrl,
      params: {
        namePrefix: searchTerm,
        limit: citiesPerPage,
        offset: (currentPage - 1) * citiesPerPage,
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data;
      setResults(data.data);
      setTotalCities(data.metadata.totalCount);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCities(searchTerm, citiesPerPage, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCities(searchTerm, citiesPerPage, page);
  };

  const handleCitiesPerPageChange = (e) => {
    const value = Math.min(10, Math.max(1, e.target.value));
    setCitiesPerPage(value);
    setCurrentPage(1);
    fetchCities(searchTerm, value, 1);
  };

  return (
    <div className="search-cities-container">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <CitiesTable
        results={results}
        currentPage={currentPage}
        citiesPerPage={citiesPerPage}
        loading={loading}
        searchTerm={searchTerm}
      />
      <Pagination
        currentPage={currentPage}
        totalCities={totalCities}
        citiesPerPage={citiesPerPage}
        handlePageChange={handlePageChange}
        handleCitiesPerPageChange={handleCitiesPerPageChange}
      />
    </div>
  );
};

export default SearchCities;
