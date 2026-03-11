import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import logo from "./assets/logo.png";
import gsap from "gsap";
// 1. Import OrderFlow instead of Choose_Plan directly
import OrderFlow from "./components/OrderFlow"; 

const Hero = () => {
  const [showPlans, setShowPlans] = useState(false);

  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef([]); // Ref array for GSAP
  const footerRef = useRef(null);
  const whatsappRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = containerRef.current.querySelectorAll(
        ".bg-blob, .bg-blob2, .bg-blob3"
      );
      const buttonEls = buttonsRef.current.filter(Boolean);
      
      const tl = gsap.timeline();

      tl.from(logoRef.current, { y: -30, opacity: 0, duration: 0.6, ease: "power2.out" })
        .from(badgeRef.current, { y: -10, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(titleRef.current, { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.2")
        .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(buttonEls, { y: 20, opacity: 0, stagger: 0.12, duration: 0.5, ease: "power2.out" }, "-=0.4")
        .from(footerRef.current, { y: 10, opacity: 0, duration: 0.4 }, "-=0.3")
        .from(whatsappRef.current, { scale: 0.6, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, "-=0.4");

      gsap.to(blobs, { 
        y: 20, 
        x: 10, 
        repeat: -1, 
        yoyo: true, 
        ease: "sine.inOut", 
        duration: 6, 
        stagger: 0.5 
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      {/* Background blobs */}
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>
      <div className="bg-blob2 bg-blob-3"></div>
      <div className="bg-blob2 bg-blob-4"></div>
      <div className="bg-blob3 bg-blob-5"></div>
      <div className="bg-blob3 bg-blob-6"></div>

      <div className="hero-content">
        <div className="logo-box">
          <img src={logo} alt="Logo" className="logo-image" ref={logoRef} />
        </div>

        <div className="badge" ref={badgeRef}>
          STOP PAYING LAKHS FOR ONE REEL
        </div>

        <h1 className="hero-title" ref={titleRef}>
          Professional reels for brands,
          <br />
          startups & creators. No contracts.
          <br />
          Order even 1 reel.
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          We create professional reels you can post today – pay per reel, no drama.
        </p>

        <div className="hero-buttons">
          {/* 🟢 FIXED: Added onClick to open the modal */}
          <button
            className="primary-btn"
            ref={(el) => (buttonsRef.current[0] = el)}
            onClick={() => setShowPlans(true)}
          >
            ORDER A REEL
          </button>

          <button
            className="secondary-btn"
          
          >
            View Pricing <span>→</span>
          </button>
        </div>

        <p className="hero-footer" ref={footerRef}>
          No commitments • Fast delivery • Affordable
        </p>
      </div>

      {/* MODAL POPUP - Now uses OrderFlow */}
      {showPlans && (
        <div className="plan-overlay">
           <div className="plan-modal">
              <button className="close-btn" onClick={() => setShowPlans(false)}>✕</button>
              {/* 🟢 Swap Choose_Plan with OrderFlow */}
              <OrderFlow />
           </div>
        </div>
      )}

      <a className="whatsapp-btn" href="#" ref={whatsappRef}>
        💬
      </a>
    </section>
  );
};

export default Hero;