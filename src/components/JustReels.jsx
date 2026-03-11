import React from "react";
import "./JustReels.css";
import Dimply from "../assets/Dimply.png"; // Make sure this path is correct in your project

// Premium SVG Icons
const CrossIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff4a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="list-icon">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="list-icon">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const WhyJustReels = () => {
  return (
    <section className="why-section">
      <div className="why-container">

        {/* Left Image with Glow Wrapper */}
        <div className="why-image-wrapper">
          <div className="image-glow"></div>
          <img src={Dimply} alt="Creator" className="why-image" />
        </div>

        {/* Right Content */}
        <div className="why-content">
          <div className="brand-header">
            <h2>
              Why brands choose <br />
              <span className="gradient-text">JustReels</span>
            </h2>
          </div>
          
          <div className="content-body">
            <p className="desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text.
            </p>

            <ul className="premium-points">
              <li className="point-card wrong">
                <div className="icon-wrapper error"><CrossIcon /></div>
                <span>Influencers charge ₹1–2L per reel</span>
              </li>
              <li className="point-card wrong">
                <div className="icon-wrapper error"><CrossIcon /></div>
                <span>Agencies force monthly contracts</span>
              </li>
              <li className="point-card wrong">
                <div className="icon-wrapper error"><CrossIcon /></div>
                <span>Founders just want content</span>
              </li>
              <li className="point-card right highlight">
                <div className="icon-wrapper success"><CheckIcon /></div>
                <span>JustReels fixes this</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyJustReels;