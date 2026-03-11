import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Choose_Plan.css'; // Or wherever your CSS is
import ContentAvailability from './ContentAvailability';
// 🔴 CRITICAL: Notice the { onNext } inside the brackets below
const ReelSelection = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState('basic');

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const helperRef = useRef(null);
  const btnRef = useRef(null);

  const options = [
    {
      id: 'basic',
      title: 'Basic Reel',
      price: '₹1,499',
      description: 'You already have content. We’ll edit it.',
    },
    {
      id: 'pro',
      title: 'Pro Reel',
      price: '₹2,999',
      description: 'We’ll write the script + edit the reel.',
    },
  ];

  useEffect(() => {
    const validCards = cardsRef.current.filter(el => el !== null);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(validCards, { y: 50, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.6, ease: "back.out(1.2)" }, "-=0.4")
        .fromTo(helperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (id, index) => {
    setSelectedOption(id);
    if (cardsRef.current[index]) {
      gsap.fromTo(cardsRef.current[index], { scale: 0.95 }, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    }
  };

  return (
    <div className="reel-selection-wrapper">
      <div className="reel-container" ref={containerRef}>
        <h2 className="reel-heading" ref={titleRef}>What type of reel do you want?</h2>

        <div className="reel-options-group">
          {options.map((option, index) => (
            <label
              key={option.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`reel-option-card ${selectedOption === option.id ? 'active' : ''}`}
            >
              <input
                type="radio"
                name="reelType"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleSelect(option.id, index)}
                className="reel-radio-hidden"
              />
              <div className="radio-ui"><div className="radio-dot"></div></div>
              <div className="reel-content">
                <div className="reel-header">
                  <span className="reel-title">{option.title}</span>
                  <span className="reel-price">{option.price}</span>
                </div>
                <p className="reel-description">{option.description}</p>
              </div>
            </label>
          ))}
        </div>

        <p className="reel-helper-text" ref={helperRef}>
          <strong>Not sure?</strong> Choose Pro if you don’t know what to say in the reel.
        </p>

        {/* This button triggers the switch */}
        <div style={{ marginTop: '30px', textAlign: 'center' }} ref={btnRef}>
          <button className="continue-btn" onClick={onNext}>
            Continue &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelSelection;