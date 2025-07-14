import React, { useState } from 'react';
import './App.css';

function ListingTable({ listings }) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(listings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentListings = listings.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h3>Website Listings</h3>
      <table className="listing-table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Country</th>
            <th>Category</th>
            <th>Language</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentListings.map((item, index) => (
            <tr key={index}>
              <td>{item.url}</td>
              <td>{item.country}</td>
              <td>{item.category}</td>
              <td>{item.language}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
    {totalPages > 1 && (
  <div className="pagination">
    <button onClick={goToPrevPage} disabled={currentPage === 1}>← Previous</button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, i) => (
      <span
        key={i}
        className={`page-number ${i === 0 ? 'first-page' : ''} ${currentPage === i + 1 ? 'active-page' : ''}`}
      >
        {i + 1}
      </span>
    ))}

    {/* <span>  {currentPage}  {totalPages} </span> */}

    <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next →</button>
  </div>
)}

    </div>
  );
}

export default ListingTable;
