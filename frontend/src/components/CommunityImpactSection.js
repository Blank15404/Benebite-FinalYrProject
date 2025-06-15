import React, { useEffect } from "react";
import "./CommunityImpactSection.css";


const CommunityImpactSection = () => {
  useEffect(() => {
    const radialBars = document.querySelectorAll(".radial-bar");

    radialBars.forEach((bar) => {
      const percentage = bar.getAttribute("data-percentage");
      bar.style.setProperty("--percentage", percentage);
    });
  }, []);

  return (
    <section className="section community-section">
      <div className="community-container">
        <div className="community-content">
          <h2>Community Impact</h2>
          <p>
            Since our inception, BeneBite has made a significant impact on communities across the globe. Here’s what we’ve achieved together:
          </p>
          <div className="impact-stats">
            <div className="stat">
              <div className="radial-bar" data-percentage="90">
                <svg className="radial-svg">
                  <circle className="track" cx="60" cy="60" r="50"></circle>
                  <circle className="progress" cx="60" cy="60" r="50"></circle>
                </svg>
                <div className="stat-text">
                  <h3>10,000+</h3>
                  <p>Meals Donated</p>
                </div>
              </div>
            </div>
            <div className="stat">
              <div className="radial-bar" data-percentage="75">
                <svg className="radial-svg">
                  <circle className="track" cx="60" cy="60" r="50"></circle>
                  <circle className="progress" cx="60" cy="60" r="50"></circle>
                </svg>
                <div className="stat-text">
                  <h3>5,000+</h3>
                  <p>Families Fed</p>
                </div>
              </div>
            </div>
            <div className="stat">
              <div className="radial-bar" data-percentage="60">
                <svg className="radial-svg">
                  <circle className="track" cx="60" cy="60" r="50"></circle>
                  <circle className="progress" cx="60" cy="60" r="50"></circle>
                </svg>
                <div className="stat-text">
                  <h3>100+</h3>
                  <p>Communities Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpactSection;