import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './ReferenceReel.css';

const ReferenceReel = ({ onNext, onBack }) => {
  const [referenceLink, setReferenceLink] = useState('');

  // Refs for GSAP Animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const helperRef = useRef(null);
  const btnRef = useRef(null);

  // Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(inputRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(helperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="ref-wrapper">
      <div className="ref-container" ref={containerRef}>
        
        <h2 className="ref-heading" ref={titleRef}>
          Step 6: Reference Reel
          <span className="ref-subheading">(Optional)</span>
        </h2>

        {/* Input Section */}
        <div className="ref-input-group" ref={inputRef}>
          <label className="ref-label" htmlFor="reelLink">
            Instagram / Reels link
          </label>
          <input
            type="url"
            id="reelLink"
            className="ref-input"
            value={referenceLink}
            onChange={(e) => setReferenceLink(e.target.value)}
            placeholder="https://www.instagram.com/reel/..."
          />
        </div>

        {/* Helper Text */}
        <p className="ref-helper-text" ref={helperRef}>
          This helps us match your expectations and reduces revisions.
        </p>

        {/* Navigation Buttons */}
        <div className="ref-btn-container" ref={btnRef}>
          <button className="back-btn" onClick={onBack}>
            &larr; Back
          </button>

          <button 
            className="continue-btn" 
            onClick={() => onNext(referenceLink)}
          >
            {referenceLink.trim() ? 'Continue' : 'Skip & Continue'} &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReferenceReel;