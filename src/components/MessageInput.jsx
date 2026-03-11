import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './MessageInput.css'; 

const MessageInput = ({ planType, onNext, onBack }) => {
  const [message, setMessage] = useState('');

  // Refs for Animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const helperRef = useRef(null);
  const btnRef = useRef(null);

  // Helper functions to determine the plan

  const isPro = planType === 'pro';
  const isAdvance = planType === 'advance'; // Add your new plan type here

  // Dynamic Content Setup based on Plan
  let planSubtitle = '';
  let inputLabel = '';
  let inputHint = '';
  let inputPlaceholder = '';
  let isRequired = false;

  if (isAdvance) {
    planSubtitle = 'For Advance Reel';
    inputLabel = 'Detailed Vision & Script Direction';
    inputHint = 'Share your complete vision, specific hooks, or detailed brand guidelines.';
    inputPlaceholder = 'e.g., I want the hook to be exactly "Stop scrolling if you..." followed by a fast-paced montage. Brand colors must be heavily featured...';
    isRequired = true;
  } else if (isPro) {
    planSubtitle = 'For Pro Reel';
    inputLabel = 'Tell us what this reel is about';
    inputHint = 'What do you sell? Any offer? Target audience?';
    inputPlaceholder = 'e.g., We offer affordable reel editing. Target audience is small business owners...';
    isRequired = true;
  } else {
    // Default to Basic
    planSubtitle = 'For Basic Reel';
    inputLabel = 'Any text or message? (Optional)';
    inputHint = '';
    inputPlaceholder = 'Affordable pricing | DM us now';
    isRequired = false;
  }

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(inputRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
        
      if (helperRef.current) {
        tl.fromTo(helperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
      }
      
      tl.fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="msg-wrapper">
      <div className="msg-container" ref={containerRef}>
        
        {/* Step Header */}
        <div ref={titleRef} style={{ marginBottom: '20px' }}>
          <p className="msg-subheading">{planSubtitle}</p>
        </div>

        {/* Dynamic Input Section */}
        <div className="msg-input-group" ref={inputRef}>
          <label className="msg-label" htmlFor="reelMessage">
            {inputLabel}
          </label>
          
          {inputHint && (
            <p className="msg-hint">{inputHint}</p>
          )}

          <textarea
            id="reelMessage"
            className="msg-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={inputPlaceholder}
            rows="5"
          />
        </div>

        {/* Helper Box (Shows for Pro and Advance) */}
        {(isPro || isAdvance) && (
          <div className="msg-helper-box" ref={helperRef}>
            <span className="msg-helper-icon">💡</span>
            <p><strong>Don't worry about wording.</strong> We'll handle the final script based on your notes.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="msg-btn-container" ref={btnRef}>
          <button className="back-btn" onClick={onBack}>
            &larr; Back
          </button>

          <button 
            className="continue-btn" 
            onClick={() => onNext(message)}
            disabled={isRequired && message.trim().length === 0}
            style={{ 
              opacity: (isRequired && message.trim().length === 0) ? 0.5 : 1, 
              cursor: (isRequired && message.trim().length === 0) ? 'not-allowed' : 'pointer' 
            }}
          >
            Continue &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default MessageInput;