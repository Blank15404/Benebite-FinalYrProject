import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./ReceiverPage.css";
import Meal from "../images/meal-donation.jpg";

const ReceiverPage = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [viewedDonations, setViewedDonations] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showMapConfirmation, setShowMapConfirmation] = useState(false); // State for map confirmation popup
  const donationsPerPage = 6;
  const donationItemsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedViewedDonations = JSON.parse(localStorage.getItem("viewedDonations")) || [];
    setViewedDonations(new Set(storedViewedDonations));
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donations");
        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }
        const data = await response.json();
        const validDonations = data.filter((donation) => donation.foodQuantity > 0);
        const sortedDonations = validDonations.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setDonations(sortedDonations);
        setFilteredDonations(sortedDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterDonations(query, searchType);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    filterDonations(searchQuery, type);
  };

  const filterDonations = (query, type) => {
    const filtered = donations.filter((donation) => {
      if (type === "name") {
        return donation.name.toLowerCase().includes(query);
      } else if (type === "location") {
        return donation.location.toLowerCase().includes(query);
      }
      return true;
    });
    setFilteredDonations(filtered);
    setCurrentPage(1);
  };

  const handleDonationClick = (donation) => {
    const updatedViewedDonations = new Set(viewedDonations);
    updatedViewedDonations.add(donation._id);
    setViewedDonations(updatedViewedDonations);
    localStorage.setItem("viewedDonations", JSON.stringify([...updatedViewedDonations]));
    setSelectedDonation(donation);
  };

  const handleClosePopup = () => {
    setSelectedDonation(null);
  };

  const handleClaimDonation = async (donationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/donations/${donationId}/claim`, {
        method: "PUT",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to claim donation");
      }
    } catch (error) {
      console.error("Error claiming donation:", error);
    }
  };

  const handleDonateNowClick = () => {
    navigate("/donor");
  };

  const handleOpenMap = (location) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapUrl, "_blank");
  };

  const handleMapArrowClick = (location) => {
    setShowMapConfirmation(true); // Show confirmation popup
  };

  const handleMapConfirmation = (location) => {
    setShowMapConfirmation(false); // Hide confirmation popup
    handleOpenMap(location); // Open Google Maps
  };

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(filteredDonations.length / donationsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="receiver-page">
        {/* Left Side Content */}
        <div className="side-content left">
          <div className="testimonial">
            <p>
              "Donating food not only feeds the hungry but also reduces waste. It's a win-win for everyone!"
            </p>
            <span>- A Happy Donor</span>
          </div>
          <div className="statistic">
            <h3>Did You Know?</h3>
            <p>Over 1/3 of all food produced globally goes to waste.</p>
          </div>
          <div className="additional-content">
            <h3>How It Works</h3>
            <p>
              <strong>1. Search for Donations:</strong> Use the search bar to find available food donations near you.
            </p>
            <p>
            <strong>2. Contact Donor:</strong> Click on a donation to view details and enjoy your meal.
            </p>
            <p>
              <strong>3. Reduce Waste:</strong> By claiming donations, you help reduce food waste and feed those in need.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h2>Receiver Community Blog</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="search-buttons">
              <button
                className={searchType === "name" ? "active" : ""}
                onClick={() => handleSearchTypeChange("name")}
              >
                Search by Name
              </button>
              <button
                className={searchType === "location" ? "active" : ""}
                onClick={() => handleSearchTypeChange("location")}
              >
                Search by Location
              </button>
            </div>
          </div>
          <div className="donation-list">
            {currentDonations.length > 0 ? (
              currentDonations.map((donation, index) => (
                <div
                  key={donation._id}
                  className={`donation-item ${!viewedDonations.has(donation._id) ? "new" : ""}`}
                  onClick={() => handleDonationClick(donation)}
                  ref={(el) => (donationItemsRef.current[index] = el)}
                >
                  <h3>{donation.name}</h3>
                  <p><strong>Food:</strong> {donation.foodName}</p>
                  <p><strong>Type:</strong> {donation.foodType}</p>
                  <p><strong>Quantity:</strong> Serves {donation.foodQuantity} people</p>
                  <p><strong>Location:</strong> {donation.location}</p>
                </div>
              ))
            ) : (
              <p>No donations available.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              &larr;
            </button>
            <span className="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              &rarr;
            </button>
          </div>

          <div className="page-count">
            Showing {indexOfFirstDonation + 1} - {Math.min(indexOfLastDonation, filteredDonations.length)} of {filteredDonations.length} donations
          </div>
        </div>

        {/* Right Side Content */}
        <div className="side-content right">
          <div className="call-to-action">
            <h3>Want to Help?</h3>
            <p>Join us in reducing food waste and feeding those in need.</p>
            <button onClick={handleDonateNowClick}>Donate Now</button>
          </div>
          <div className="illustration">
            <img src={Meal} alt="Food Donation" />
          </div>
        </div>
      </div>

      {/* Donation Popup */}
      {selectedDonation && (
        <div className="popup">
          <div className="popup-content">
            <h3>{selectedDonation.name}</h3>
            <div className="popup-grid">
              <div className="popup-box large">
                <p>
                  <strong>Location:</strong> {selectedDonation.location}
                  <span
                    className="map-arrow"
                    onClick={() => handleMapArrowClick(selectedDonation.location)}
                  >
                    &rarr;
                  </span>
                </p>
              </div>
              <div className="popup-box medium">
                <p><strong>Contact:</strong> {selectedDonation.contact}</p>
              </div>
              <div className="popup-box small">
                <p><strong>Food Name:</strong> {selectedDonation.foodName}</p>
              </div>
              <div className="popup-box small">
                <p><strong>Food Type:</strong> {selectedDonation.foodType}</p>
              </div>
              <div className="popup-box medium">
                <p><strong>Quantity:</strong> Serves {selectedDonation.foodQuantity} people</p>
              </div>
              <div className="popup-box small">
                <p><strong>Date:</strong> {new Date(selectedDonation.date).toLocaleDateString()}</p>
              </div>
              <div className="popup-box small">
                <p><strong>Time:</strong> {selectedDonation.time}</p>
              </div>
              {selectedDonation.landmark && (
                <div className="popup-box medium">
                  <p><strong>Landmark:</strong> {selectedDonation.landmark}</p>
                </div>
              )}
            </div>
            <div className="popup-buttons">
              <button onClick={() => handleClaimDonation(selectedDonation._id)}>
                I'm Coming
              </button>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Map Confirmation Popup */}
      {showMapConfirmation && (
        <div className="popup">
          <div className="popup-content">
            <h3>Open Google Maps?</h3>
            <p>Would you like to open Google Maps for this location?</p>
            <p>And if you are coming for sure, Please don't forget to click on the I'm Coming button after viewing the location.</p>
            <div className="popup-buttons">
              <button onClick={() => handleMapConfirmation(selectedDonation.location)}>
                Yes, Open Maps
              </button>
              <button onClick={() => setShowMapConfirmation(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 BeneBite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReceiverPage;