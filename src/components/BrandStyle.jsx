import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './BrandStyle.css';

const BrandStyleDetails = ({ onNext, onBack }) => {
  // Store all selections in one state object
  const [selections, setSelections] = useState({
    tone: '',
    industry: '',
    goal: ''
  });

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  // Array of refs for each question group to animate them sequentially
  const groupsRef = useRef([]); 
  const helperRef = useRef(null);
  const btnRef = useRef(null);

  const questions = [
    {
      id: 'tone',
      title: 'Question 1: Your brand tone',
      options: ['Casual', 'Professional', 'Trendy']
    },
    {
      id: 'industry',
      title: 'Question 2: Industry',
      options: ['Ecommerce', 'Service / Agency', 'Coach / Creator', 'Local business', 'Other']
    },
    {
      id: 'goal',
      title: 'Question 3: Goal of this reel',
      options: ['Reach & visibility', 'Sales / leads', 'Brand awareness']
    }
  ];

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(groupsRef.current.filter(Boolean), 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.5 }, "-=0.2"
        )
        .fromTo(helperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = (questionId, optionValue, event) => {
    setSelections(prev => ({ ...prev, [questionId]: optionValue }));
    
    // Add a tiny bounce to the clicked pill
    gsap.fromTo(event.currentTarget, 
      { scale: 0.9 }, 
      { scale: 1, duration: 0.3, ease: "back.out(3)" }
    );
  };

  // Check if all 3 questions are answered to enable the button
  const isComplete = selections.tone && selections.industry && selections.goal;

  return (
    <div className="bsd-wrapper">
      <div className="bsd-container" ref={containerRef}>
        
        <h2 className="bsd-heading" ref={titleRef}>
          Step 4: Brand & Style Details
          <span className="bsd-subheading">Help us tailor your reel</span>
        </h2>

        {/* Map through the 3 questions */}
        {questions.map((q, index) => (
          <div 
            key={q.id} 
            className="bsd-question-group"
            ref={el => groupsRef.current[index] = el}
          >
            <h3 className="bsd-question-title">{q.title}</h3>
            <div className="bsd-pills-container">
              {q.options.map((opt) => (
                <label 
                  key={opt} 
                  className={`bsd-pill ${selections[q.id] === opt ? 'active' : ''}`}
                  onClick={(e) => handleSelect(q.id, opt, e)}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={selections[q.id] === opt}
                    onChange={() => {}} // Handled by onClick above for animation
                    className="bsd-radio-hidden"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Why this matters helper */}
        <div className="bsd-helper-box" ref={helperRef}>
          <span className="bsd-helper-icon">ℹ️</span>
          <div>
            <strong>Why this matters:</strong>
            <p>Helps us choose the right pacing, music, and CTA.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="bsd-btn-container" ref={btnRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          
          <button 
            className="back-btn" 
            onClick={onBack}
          >
            &larr; Back
          </button>

          <button 
            className="continue-btn" 
            onClick={() => onNext(selections)}
            disabled={!isComplete}
            style={{ 
              opacity: isComplete ? 1 : 0.5, 
              cursor: isComplete ? 'pointer' : 'not-allowed' 
            }}
          >
            Finish Order &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default BrandStyleDetails;