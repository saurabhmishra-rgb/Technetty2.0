import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './ContentAvailability.css';

const ContentAvailability = ({ onNext, onBack }) => {
  const [selectedContent, setSelectedContent] = useState('');

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const optionsRef = useRef([]);
  const helperRef = useRef(null);
  const tipRef = useRef(null);
  const btnRef = useRef(null); 

  const options = [
    { id: 'own', label: 'I will upload my own videos/photos' },
    { id: 'stock', label: 'I want you to use stock footage' },
    { id: 'mix', label: 'Mix of both' },
  ];

  const examples = [
    { icon: '📱', text: 'Mobile videos (vertical preferred)' },
    { icon: '🛍️', text: 'Product photos' },
    { icon: '🎥', text: 'Screen recordings' },
    { icon: '🏢', text: 'Office / workspace clips' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(optionsRef.current.filter(Boolean), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, "-=0.3")
        .fromTo(helperRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.2")
        .fromTo(tipRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(btnRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = (id, index) => {
    setSelectedContent(id);
    if (optionsRef.current[index]) {
      gsap.fromTo(optionsRef.current[index], { scale: 0.98 }, { scale: 1, duration: 0.3, ease: "back.out(3)" });
    }
  };

  return (
    <div className="ca-wrapper">
      <div className="ca-container" ref={containerRef}>
        <h2 className="ca-heading" ref={titleRef}>
          Step 2: Content Availability
          <span className="ca-subheading">What content will you provide?</span>
        </h2>

        <div className="ca-options-group">
          {options.map((option, index) => (
            <label
              key={option.id}
              ref={(el) => (optionsRef.current[index] = el)}
              className={`ca-option-card ${selectedContent === option.id ? 'active' : ''}`}
            >
              <input
                type="radio"
                name="contentType"
                value={option.id}
                checked={selectedContent === option.id}
                onChange={() => handleSelect(option.id, index)}
                className="ca-radio-hidden"
              />
              <div className="ca-radio-ui">
                <div className="ca-radio-dot"></div>
              </div>
              <span className="ca-option-text">{option.label}</span>
            </label>
          ))}
        </div>

        <div className="ca-helper-box" ref={helperRef}>
          <h4 className="ca-helper-title">Good content examples:</h4>
          <div className="ca-examples-grid">
            {examples.map((ex, i) => (
              <div key={i} className="ca-example-item">
                <span className="ca-icon">{ex.icon}</span>
                <span className="ca-text">{ex.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ca-tip-box" ref={tipRef}>
          <span className="ca-tip-icon">💡</span>
          <p>
            <strong>Tip:</strong> Vertical videos work best (9:16). Even phone-shot videos are okay.
          </p>
        </div>

        <div className="ca-action-footer" ref={btnRef} style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            type="button" 
            className="back-btn" 
            onClick={onBack}
            style={{ padding: '12px 24px', borderRadius: '100px', border: '1px solid #e0e0e0', cursor: 'pointer', background: '#fff' }}
          >
            &larr; Back
          </button>
          
          <button 
            type="button" 
            className="continue-btn" 
            // 🔴 FIXED: Now passing 'selectedContent' to the parent
            onClick={() => onNext(selectedContent)}
            disabled={!selectedContent} 
            style={{ 
              opacity: selectedContent ? 1 : 0.5, 
              cursor: selectedContent ? 'pointer' : 'not-allowed' 
            }}
          >
            Continue &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContentAvailability;