import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DonorPage from "./components/DonorPage";
import ReceiverPage from "./components/ReceiverPage";
import ScrollToTop from "./ScrollToTop";
import AboutUsPage from "./components/AboutUsPage";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/receiver" element={<ReceiverPage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;