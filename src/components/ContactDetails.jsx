import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './ContactDetails.css';

const ContactDetails = ({ onNext, onBack }) => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  // Refs for Animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const fieldsRef = useRef([]);
  const helperRef = useRef(null);
  const btnRef = useRef(null);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(fieldsRef.current.filter(Boolean), 
          { y: 15, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, "-=0.2"
        )
        .fromTo(helperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Simple validation: Ensure all fields have at least some text
  const isComplete = 
    contactInfo.name.trim() !== '' && 
    contactInfo.email.trim() !== '' && 
    contactInfo.whatsapp.trim() !== '';

  return (
    <div className="contact-wrapper">
      <div className="contact-container" ref={containerRef}>
        
        <h2 className="contact-heading" ref={titleRef}>
          Step 8: Contact Details
          <span className="contact-subheading">Almost done! Where should we send updates?</span>
        </h2>

        {/* Form Fields */}
        <div className="contact-form">
          <div className="contact-input-group" ref={(el) => (fieldsRef.current[0] = el)}>
            <label className="contact-label" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="contact-input"
              value={contactInfo.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>

          <div className="contact-input-group" ref={(el) => (fieldsRef.current[1] = el)}>
            <label className="contact-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="contact-input"
              value={contactInfo.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="contact-input-group" ref={(el) => (fieldsRef.current[2] = el)}>
            <label className="contact-label" htmlFor="whatsapp">WhatsApp number</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              className="contact-input"
              value={contactInfo.whatsapp}
              onChange={handleChange}
              placeholder="+91 00000 00000"
            />
          </div>
        </div>

        {/* Helper Text */}
        <div className="contact-helper-box" ref={helperRef}>
          <span className="contact-helper-icon">📱</span>
          <p>We'll share the preview & updates directly on WhatsApp.</p>
        </div>

        {/* Navigation Buttons */}
        <div className="contact-btn-container" ref={btnRef}>
          <button className="back-btn" onClick={onBack}>
            &larr; Back
          </button>

          <button 
            className="continue-btn" 
            onClick={() => onNext(contactInfo)}
            disabled={!isComplete}
            style={{ 
              opacity: isComplete ? 1 : 0.5, 
              cursor: isComplete ? 'pointer' : 'not-allowed' 
            }}
          >
            Continue to Payment &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContactDetails;