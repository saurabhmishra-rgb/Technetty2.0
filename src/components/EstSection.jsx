// React
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./EstSection.css";

const EstSection = () => {
  const blobsRef = useRef([]);

  useEffect(() => {
    blobsRef.current.forEach((blob, i) => {
      gsap.to(blob, {
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        z: Math.random() * 60 - 30,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationZ: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.75,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <section className="est-section">
      <div className="est-container">
        {/* LEFT CONTENT */}
        <div className="est-text">
          <h2>Est. 2026</h2>
          <h1>No Lies...no fancy talks</h1>
          <p>
            Since its founding, Studio Agatho has been the go-to
            company for various design needs. Its offerings range
            from graphic design and branding strategy to website
            development and video production.
          </p>
        </div>

        {/* RIGHT SHAPES */}
        <div className="est-shapes">
          {[1, 2, 3, 4].map((_, i) => (
            <img
              key={i}
            
              alt="blob"
              className={`blob blob-${i + 1}`}
              ref={(el) => (blobsRef.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EstSection;
