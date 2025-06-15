import React, { useEffect } from "react";
import Header from "./Header";
import "./AboutUsPage.css";
import StoryImage from "../images/story.jpg"; 
import CommunityImpactSection from "./CommunityImpactSection";
import CompassionImage from "../images/compassion.jpg";
import SustainabilityImage from "../images/sustain.jpg";
import CommunityImage from "../images/community1.jpg";
import InnovationImage from "../images/innovation.jpg";
import TransparencyImage from "../images/transparency.jpg";
import EmpowermentImage from "../images/empowerment.jpg";


const AboutUsPage = () => {
  // Smooth scroll effect for sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        if (sectionTop < window.innerHeight * 0.8 && sectionBottom > 0) {
          section.classList.add("visible");
          // Alternate slide direction for each section
          if (index % 2 === 0) {
            section.classList.add("slide-left");
          } else {
            section.classList.add("slide-right");
          }
        } else {
          section.classList.remove("visible");
          section.classList.remove("slide-left", "slide-right");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="about-us-container">
      <Header />
      {/* Hero Section */}
      <section className="hero-section1">
        <div className="hero-content1">
          <h1>About BeneBite</h1>
          <p>
            Turning Surplus into Smiles: Bridging the Gap Between Food Waste and Hunger
          </p>
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <br></br>


      {/* Our Story Section */}
      <section className="section story-section">
        <div className="story-container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              BeneBite was born out of a simple yet powerful idea: no one should go hungry while good food goes to waste. Founded in 2024, our journey began with a small team of passionate individuals determined to make a difference.
            </p>
            <p>
              From humble beginnings, we’ve grown into a platform that connects communities, reduces food waste, and feeds thousands of families in need. Every meal donated is a step toward a more sustainable and compassionate world.
            </p>
          </div>
          <div className="story-image">
            <img src={StoryImage} alt="Our Story" />
          </div>
        </div>
      </section>
      <br></br>
      <br></br>

        {/* Our Values Section */}
        <section className="section values-section">
        <div className="values-container">
            <h2>Our Values</h2>
            <p className="subheading">
            At BeneBite, we are guided by a set of core values that define who we are and how we operate:
            </p>
            <div className="values-collage">
            {/* Content Cards */}
            <div className="value-card compassion">
                <h3>Compassion</h3>
                <p>
                We believe in treating everyone with kindness and empathy, ensuring that no one is left behind.
                </p>
            </div>
            <div className="value-card sustainability">
                <h3>Sustainability</h3>
                <p>
                We are committed to reducing food waste and promoting eco-friendly practices.
                </p>
            </div>
            <div className="value-card community">
                <h3>Community</h3>
                <p>
                We strive to build strong, connected communities where everyone has access to nutritious food.
                </p>
            </div>
            <div className="value-card innovation">
                <h3>Innovation</h3>
                <p>
                We embrace creativity and technology to find new ways to reduce waste and feed more people.
                </p>
            </div>
            <div className="value-card transparency">
                <h3>Transparency</h3>
                <p>
                We operate with honesty and openness, ensuring trust between donors, receivers, and our team.
                </p>
            </div>
            <div className="value-card empowerment">
                <h3>Empowerment</h3>
                <p>
                We empower individuals and communities to take action against hunger and food waste.
                </p>
            </div>

            {/* Image Cards */}
            <div className="value-image compassion-image">
                <img src={CompassionImage} alt="Compassion" />
            </div>
            <div className="value-image sustainability-image">
                <img src={SustainabilityImage} alt="Sustainability" />
            </div>
            <div className="value-image community-image">
                <img src={CommunityImage} alt="Community" />
            </div>
            <div className="value-image innovation-image">
                <img src={InnovationImage} alt="Innovation" />
            </div>
            <div className="value-image transparency-image">
                <img src={TransparencyImage} alt="Transparency" />
            </div>
            <div className="value-image empowerment-image">
                <img src={EmpowermentImage} alt="Empowerment" />
            </div>
            </div>
        </div>
        </section>
      <br></br>
      <br></br>

      {/* Community Impact Section */}
      <CommunityImpactSection />

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Join Us in Making a Difference</h2>
          <p>
            Whether you're a donor with surplus food or someone in need of a meal, BeneBite is here to help. Together, we can create a world where no food goes to waste and no one goes hungry.
          </p>
          <div className="cta-buttons">
            <a href="/donor" className="cta-button">Become a Donor 🢂</a>
            <a href="/receiver" className="cta-button">Find Food Near You 🢂</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 BeneBite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUsPage;