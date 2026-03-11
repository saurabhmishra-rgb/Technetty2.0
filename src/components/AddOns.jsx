import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './AddOns.css';

const AddOns = ({ onNext, onBack }) => {
  // State to track which add-ons the user has selected
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Refs for Animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef([]);
  const btnRef = useRef(null);

  // Hardcoded list of add-ons based on your workflow diagram
  const availableAddOns = [
    { id: 'revision', label: 'Extra revision', price: 499 },
    { id: 'urgent', label: 'Urgent delivery - 24 hrs', price: 999 },
    { id: 'caption', label: 'Caption + hashtag pack', price: 499 },
    { id: 'resize', label: 'Resize for YouTube/Facebook', price: 499 },
    { id: 'stock', label: 'Stock-heavy reel', price: 499 },
  ];

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(listRef.current.filter(Boolean), 
          { x: -15, opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, "-=0.2"
        )
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Handle checking/unchecking boxes
  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const isAlreadySelected = prev.find((item) => item.id === addon.id);
      
      if (isAlreadySelected) {
        // Remove it if it was already selected
        return prev.filter((item) => item.id !== addon.id);
      } else {
        // Add it to the array
        return [...prev, addon];
      }
    });
  };

  return (
    <div className="addons-wrapper">
      <div className="addons-container" ref={containerRef}>
        
        <h2 className="addons-heading" ref={titleRef}>
          Step 7: Add-Ons
          <span className="addons-subheading">Level up your reel (Optional)</span>
        </h2>

        {/* Add-Ons List */}
        <div className="addons-list">
          {availableAddOns.map((addon, index) => {
            const isSelected = selectedAddOns.some((item) => item.id === addon.id);
            
            return (
              <label 
                key={addon.id} 
                className={`addon-item ${isSelected ? 'selected' : ''}`}
                ref={(el) => (listRef.current[index] = el)}
              >
                <div className="addon-info">
                  <input
                    type="checkbox"
                    className="addon-checkbox"
                    checked={isSelected}
                    onChange={() => toggleAddOn(addon)}
                  />
                  <span className="addon-label">{addon.label}</span>
                </div>
                <span className="addon-price">+₹{addon.price}</span>
              </label>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="addons-btn-container" ref={btnRef}>
          <button className="back-btn" onClick={onBack}>
            &larr; Back
          </button>

          <button 
            className="continue-btn" 
            onClick={() => onNext(selectedAddOns)}
          >
            {selectedAddOns.length > 0 ? 'Continue' : 'Skip & Continue'} &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddOns;