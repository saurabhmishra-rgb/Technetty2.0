import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Section: Brand & Socials */}
        <div className="footer-top">
          <div className="footer-brand">
            <h2>Just<span className="gradient-text">Reels</span></h2>
            <p className="technetty-tag">A product of <span>Technetty</span></p>
          </div>

          <div className="footer-socials">
            <h4>Connect with us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Cinematic Gradient Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section: Links & Copyright */}
        <div className="footer-bottom">
          <p className="copyright">
            © 2026 JustReels. All rights reserved.
          </p>

          <div className="footer-links">
            <a href="#">Terms & Support</a>
            <span className="separator">•</span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;