import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DonorImg from "../images/donor-image.jpg";
import ReceiverImg from "../images/receiver-image.jpg";
import Community from "../images/community.jpg";
import CommuSupport from "../images/commu-support.jpg";
import FoodSecurity from "../images/food-security.jpg";
import FoodWastage from "../images/food-wastage.jpg";
import Resource from "../images/resource.jpg";
import Social from "../images/social.jpg";
import Sustain from "../images/sustainability.jpg";
import Quote from "../images/qoute.png";
import Header from "../components/Header";
import "../pages/LandingPage.css";

const LandingPage = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 7; // Total number of slides
  const intervalRef = useRef(null); // Ref to store the interval
  const navigate = useNavigate();


  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = Quote;
    img.onload = () => {
      setIsImageLoaded(true); // Set image as loaded
    };
  }, []);

  // Add fade-in effect on page load
  useEffect(() => {
    if (isImageLoaded) {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("visible");
        }, index * 300); // Delay for each element to fade in sequentially
      });
    }
  }, [isImageLoaded]);

  // Function to start the automatic carousel
  const startAutoSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 10000); 
  }, [totalSlides]);

  // Function to reset the timer for automatic sliding
  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); 
    }
    startAutoSlide(); // Start a new interval
  }, [startAutoSlide]);

  // Effect to handle automatic sliding
  useEffect(() => {
    startAutoSlide(); // Start the automatic carousel
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Cleanup interval on unmount
      }
    };
  }, [startAutoSlide]);

  // Effect to reset the timer when the slide changes
  useEffect(() => {
    resetAutoSlide(); // Reset the timer whenever the slide changes
  }, [currentSlide, resetAutoSlide]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  return (
    <div className="landing-container">
      <Header /> 

      <section className="full-image-section">
        {isImageLoaded ? (
          <img src={Quote} alt="Main Visual" className="full-page-image" />
        ) : (
          <div className="image-placeholder"></div> 
        )}
      </section>

      {isImageLoaded && (
        <>
          <section className="hero-section fade-in">
            <div className="hero-card">
              <h1>Together, We Can Make a Difference</h1>
              <p>
                BeneBite is a platform that helps connect donors with those in need, minimizing food waste and spreading kindness.
              </p>
              <div className="hero-details">
                <div className="detail-item">
                  <h3>Our Mission</h3>
                  <p>
                    Reducing food waste and ensuring every meal serves a purpose. We aim to bridge the gap between surplus and need.
                  </p>
                </div>
                <div className="detail-item">
                  <h3>How It Works</h3>
                  <p>
                    Donors can easily list surplus food items while receivers can find and collect them with just a few clicks.
                  </p>
                </div>
                <div className="detail-item">
                  <h3>Impact</h3>
                  <p>
                    Over <strong>10,000 meals</strong> saved and counting. Join the movement to make a sustainable difference.
                  </p>
                </div>
              </div>
              <button className="learn-more-button" onClick={() => navigate("/about")}>Learn More</button>
            </div>
          </section>

          <section className="scrollable-content fade-in">
            <div className="carousel-container">
              <div
                className="carousel-wrapper"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Carousel slides */}
                <div className="carousel-slide">
                  <div className="carousel-image">
                    <img src={Community} alt="Food Wastage" />
                  </div>
                  <div className="carousel-content">
                    <h2>Why Should You Help?</h2>
                    <p>
                      Our mission is to bring the community together, reduce food
                      waste, and provide those in need with a helping hand. We
                      believe that small acts of kindness can make a big difference.
                    </p>
                    <p>
                      Food that goes to waste could nourish the hungry. You can be
                      the change by donating your extra food or resources. Let's
                      take action today!
                    </p>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="carousel-image">
                    <img src={FoodWastage} alt="Food Wastage" />
                  </div>
                  <div className="carousel-content">
                    <h2>Food Wastage</h2>
                    <p>
                      Did you know that one-third of all food produced worldwide is
                      wasted? This is a crisis that affects both our planet and
                      those in need.
                    </p>
                    <p>
                      By donating your surplus food, you can prevent waste and
                      ensure that nutritious meals are available to those who need
                      them the most.
                    </p>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="carousel-image">
                    <img src={Resource} alt="Resource Redistribution" />
                  </div>
                  <div className="carousel-content">
                    <h2>Resource Redistribution</h2>
                    <p>
                      Every year, millions of pounds of food go unused while
                      communities in need are struggling for access. The solution
                      lies in redistributing resources.
                    </p>
                    <p>
                      Join BeneBite to help bridge the gap between excess resources
                      and those in need. Together, we can ensure no one is left
                      hungry.
                    </p>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="carousel-image">
                    <img src={FoodSecurity} alt="Food Security" />
                  </div>
                  <div className="carousel-content">
                    <h2>Food Security</h2>
                    <p>
                      Access to food is a basic human right, yet millions of people
                      around the world lack consistent access to nutritious food.
                    </p>
                    <p>
                      Through our collective efforts, we can help build a more
                      secure food system where everyone has enough to eat, every
                      day.
                    </p>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="carousel-image">
                    <img src={Social} alt="Social Impact" />
                  </div>
                  <div className="carousel-content">
                    <h2>Social Impact</h2>
                    <p>
                      Acts of kindness have a ripple effect—every donation, no
                      matter how small, contributes to a stronger, more connected
                      community.
                    </p>
                    <p>
                      Your contribution to BeneBite can have a lasting impact on not
                      just the recipients but the entire community, making us all
                      better together.
                    </p>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="carousel-image">
                    <img src={Sustain} alt="Sustainability" />
                  </div>
                  <div className="carousel-content">
                    <h2>Sustainability</h2>
                    <p>
                      Sustainability is key to our future. Food donations help
                      reduce waste, decrease environmental impact, and promote
                      responsible consumption.
                    </p>
                    <p>
                      Join BeneBite in building a sustainable future by donating
                      food and services that reduce waste and promote eco-friendly
                      practices.
                    </p>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="carousel-image">
                    <img src={CommuSupport} alt="Community Support" />
                  </div>
                  <div className="carousel-content">
                    <h2>Community Support</h2>
                    <p>
                      Strong communities are built on support and empathy. By
                      supporting local efforts to fight hunger and waste, we uplift
                      each other.
                    </p>
                    <p>
                      BeneBite is about more than just food—it's about creating a
                      sense of unity, helping neighbors, and making our communities
                      stronger.
                    </p>
                  </div>
                </div>
              </div>

              {/* Manual Controls */}
              <button className="carousel-arrow left" onClick={goToPrevSlide}>
                &larr;
              </button>
              <button className="carousel-arrow right" onClick={goToNextSlide}>
                &rarr;
              </button>

              {/* Dots for Navigation */}
              <div className="carousel-dots">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentSlide === index ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                  ></span>
                ))}
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="content-section">
            <div className="role-boxes">
              {/* Donor Box */}
              <div className="role-box donor-box fade-in">
                <div className="image-container">
                  <img
                    src={DonorImg}
                    alt="Become a Donor"
                    className="grayed-image"
                  />
                  <div className="box-title">
                    <h3>Become a Donor</h3>
                  </div>
                  <Link to="/donor" className="role-button">
                    →
                  </Link>
                </div>
                <p>
                  Help us feed the needy by donating your surplus food or
                  contributing your services.
                </p>
              </div>

              {/* Receiver Box */}
              <div className="role-box receiver-box fade-in">
                <div className="image-container">
                  <img
                    src={ReceiverImg}
                    alt="Are you in Need?"
                    className="grayed-image"
                  />
                  <div className="box-title">
                    <h3>Are You in Need?</h3>
                  </div>
                  <Link to="/receiver" className="role-button">
                    →
                  </Link>
                </div>
                <p>
                  If you're in need of food or resources, we are here to connect you
                  with donors in your area.
                </p>
              </div>
            </div>
          </section>

          <footer className="footer">
            <p>© 2025 BeneBite. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default LandingPage;