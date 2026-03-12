import React, { useState, useEffect } from "react";
import "./Pricing.css";
import basicImg from "../assets/basicImg.png"; // Ensure path is correct
import proImg from "../assets/proImg.png"; // Ensure path is correct
import OrderFlow from "./OrderFlow"; // Adjust path if OrderFlow is in a different folder

const Pricing = () => {
  // 1. Add state to control the modal
  const [showPlans, setShowPlans] = useState(false);

  // 2. Lock background scrolling when the modal is open
  
  return (
    <section className="pricing">
      <div className="pricing-content">
        <div className="pricing-header">
          <h2 className="pricing-title">
            Why brands choose <span className="gradient-text">JustReels</span>
          </h2>
          <p className="pricing-subtitle">
            We only do reels. Nothing else. Agencies sell packages. Influencers sell reach.
            <br className="desktop-break" />
            We create professional reels you can post today – pay per reel, no drama.
          </p>
        </div>

        <div className="pricing-cards">
          {/* Basic Card */}
          <div className="pricing-card basic-card">
            <div className="card-image-wrapper">
              <img src={basicImg} alt="Basic Reel" />
            </div>
            <div className="card-info">
              <h3>Basic Reel</h3>
              <p className="price">₹1,499 <span>/ reel</span></p>
              <button className="pricing-btn" onClick={() => setShowPlans(true)}>
                ORDER BASIC REEL
              </button>
            </div>
          </div>

          {/* Pro Card */}
          <div className="pricing-card pro-card">
            <div className="popular-badge">Most Popular</div>
            <div className="card-image-wrapper">
              <img src={proImg} alt="Pro Reel" />
            </div>
            <div className="card-info">
              <h3>Pro Reel</h3>
              <p className="price">₹2,999 <span>/ reel</span></p>
              <button className="pricing-btn pro-btn" onClick={() => setShowPlans(true)}>
                ORDER PRO REEL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Add the Modal Overlay at the bottom of the section */}
      {showPlans && (
        <div className="plan-overlay">
          <div className="plan-modal">
            <button className="close-btn" onClick={() => setShowPlans(false)}>✕</button>
            <OrderFlow />
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;