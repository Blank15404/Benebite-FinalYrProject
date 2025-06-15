import React, { useState } from "react";
import Header from "./Header";
import "./DonorPage.css";

const DonorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    foodName: "",
    foodType: "veg",
    foodQuantity: "",
    date: "",
    time: "",
    location: "",
    landmark: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationVerified, setIsLocationVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerifyLocation = () => {
    if (!formData.location) {
      setMessageType("error");
      setMessage("Please enter a location before verifying.");
      setShowMessagePopup(true);
      setTimeout(() => setShowMessagePopup(false), 5000);
      return;
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsLocationVerified(true); // Enable submit button after verifying
    setMessageType("success");
    setMessage("Location verified. You can now submit the form.");
    setShowMessagePopup(true);
    setTimeout(() => setShowMessagePopup(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate foodQuantity
    if (formData.foodQuantity <= 0) {
      setMessageType("error");
      setMessage("Food Quantity must be greater than 0.");
      setShowMessagePopup(true);
      setTimeout(() => setShowMessagePopup(false), 5000);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage("Donation submitted successfully!");
        setFormData({
          name: "",
          contact: "",
          foodName: "",
          foodType: "veg",
          foodQuantity: "",
          date: "",
          time: "",
          location: "",
          landmark: "",
        });
        setIsLocationVerified(false);
      } else {
        setMessageType("error");
        setMessage(`Failed to submit donation: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageType("error");
      setMessage("Error submitting donation. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
      setShowMessagePopup(true);
      setTimeout(() => setShowMessagePopup(false), 5000);
    }
  };

  return (
    <div className="donor-container">
      <Header />
      <div className="donor-hero-section">
        <div className="donor-hero-content">
          <h1>Turn Surplus Food into Lifelines</h1>
          <p>
            Join BeneBite in reducing food waste and helping those in need. Your donation can make a
            world of difference.
          </p>
          <button className="donor-hero-button">Learn More</button>
        </div>
      </div>
      <div className="donor-content-section">
        <h2>Why Donate Food?</h2>
        <div className="donor-content-grid">
          <div className="donor-content-card">
            <div className="donor-icon">🍴</div>
            <h3>Feed Families in Need</h3>
            <p>
              Your donation helps provide nutritious meals to families struggling with hunger.
            </p>
          </div>
          <div className="donor-content-card">
            <div className="donor-icon">🌍</div>
            <h3>Reduce Food Waste</h3>
            <p>
              By donating surplus food, you help reduce waste and its impact on the environment.
            </p>
          </div>
          <div className="donor-content-card">
            <div className="donor-icon">❤️</div>
            <h3>Build a Stronger Community</h3>
            <p>
              Your act of kindness fosters a sense of unity and compassion in your community.
            </p>
          </div>
        </div>
      </div>
      <div className="donor-form-card">
        <h2>Donate Food</h2>
        <form onSubmit={handleSubmit}>
          <div className="donor-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="donor-form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <h3>Food Details</h3>
          <div className="donor-form-group">
            <label htmlFor="foodName">Food Name</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              placeholder="Enter the name of the food"
              value={formData.foodName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="donor-form-group">
            <label>Food Type</label>
            <div className="donor-radio-group">
              <label>
                <input
                  type="radio"
                  name="foodType"
                  value="veg"
                  checked={formData.foodType === "veg"}
                  onChange={handleChange}
                />
                Vegetarian
              </label>
              <label>
                <input
                  type="radio"
                  name="foodType"
                  value="non-veg"
                  checked={formData.foodType === "non-veg"}
                  onChange={handleChange}
                />
                Non-Vegetarian
              </label>
            </div>
          </div>
          <div className="donor-form-group">
            <label htmlFor="foodQuantity">Food Quantity</label>
            <input
              type="number"
              id="foodQuantity"
              name="foodQuantity"
              placeholder="Enter the number of people it can serve"
              value={formData.foodQuantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="donor-form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="donor-form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="donor-form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter your address"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={handleVerifyLocation} className="donor-verify-button">
              Verify Location
            </button>
            {isLocationVerified && (
              <p className="donor-note">Location verified. You can now submit the form.</p>
            )}
          </div>
          <div className="donor-form-group">
            <label htmlFor="landmark">Landmark (optional)</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              placeholder="Enter a nearby landmark"
              value={formData.landmark}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={isLoading || !isLocationVerified} className="donor-submit-button">
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {showMessagePopup && (
          <div className={`donor-message-popup ${messageType}`}>
            <span className="message">{message}</span>
            <button className="close-btn" onClick={() => setShowMessagePopup(false)}>
              &times;
            </button>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="donor-popup">
          <div className="donor-popup-content">
            <h3>Verify Your Location</h3>
            <p>
              To ensure your address is correct, please follow these steps:
            </p>
            <ol>
              <li>
                Click the link below to open Google Maps:
                <br />
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    formData.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Google Maps
                </a>
              </li>
              <li>Check if the address is correct on Google Maps.</li>
              <li>If the address is correct, copy it and paste it back into the location field.</li>
              <li>Click the "Close" button below to confirm.</li>
            </ol>
            <button onClick={handleClosePopup} className="donor-close-button">Close</button>
          </div>
        </div>
      )}
      <footer className="donor-footer">
        <div className="donor-footer-content">
          <p>© 2025 BeneBite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DonorPage;