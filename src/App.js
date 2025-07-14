import React, { useState } from 'react';
import WebsiteFormPopup from './WebsiteFormPopup';
import ListingTable from './ListingTable';
import './App.css';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [listings, setListings] = useState([]);

  const handleFormSubmit = (data) => {
    setListings([...listings, data]);
    setShowPopup(false);
  };

  return (
  <>
  {/* ✅ Navigation Bar */}
  <nav className="navbar">
    <div className="navbar-logo">MySite</div>
    <ul className="navbar-links">
      <li>Home</li>
      <li className="active">My Websites</li>
      <li>About Us</li>
      <li>Contact Us</li>
    </ul>
  </nav>

    <div className="app-container">
        
      <h1>Website Listing Page</h1>

      {/* Accordion Section */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => setAccordionOpen(!accordionOpen)}>
          <p>Hey Accept the preconditions to start listing</p>
          
          <span className={`status ${accepted ? 'accepted' : 'pending'}`}>
            
            {accepted ? (
  <span>Accepted</span>
) : (
  <div className='statusdiv'>
    <div></div>
        <span> &nbsp;Pending</span>

  </div>
)}

          </span>
        </div>
        {accordionOpen && !accepted && (
          <div className="accordion-body">
            <p>a dummy or placeholder text commonly used in graphic design, publishing, and web development. Its purpose is to permit a page layout to be designed.a dummy or placeholder text commonly used in graphic design, publishing, and web development. Its purpose is to permit a page layout to be designed.</p>
            <button className="accept-btn" onClick={() => setAccepted(true)}>Accept</button>
          </div>
        )}
      </div>

      {/* Add Website Button */}
      <button className="add-button" onClick={() => setShowPopup(true)} disabled={!accepted}>
        Add Website +
      </button>

      {/* Popup Form */}
      {showPopup && (
        <WebsiteFormPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Table */}
      <ListingTable listings={listings} />
    </div>
    </>
  );
}

export default App;
