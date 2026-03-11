import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./VideoShowcase.css";

const videos = [
  { title: "Radha Radha", videoSrc: "https://youtube.com/shorts/2xfRygxzr7c?si=hTkE_wYCT_77DOo9" },
  { title: "Krishna Video", videoSrc: "https://youtube.com/shorts/EpsehTAUV6c?si=BTVKnyKLRO5UA6bj" },
  { title: "Lake Vostok", videoSrc: "https://youtube.com/shorts/dFZQfkiqvec?si=CgEqdtxQGxuNA1o7" },
  { title: "Video 4", videoSrc: "https://youtube.com/shorts/2xfRygxzr7c?si=hTkE_wYCT_77DOo9" },
  { title: "Video 5", videoSrc: "https://youtube.com/shorts/tYXkzPdq7T8?si=ihWYL3Rt9RB8-JBm" }
];

const convertToEmbed = (url) => {
  if (!url.includes("youtube")) return url;
  const id = url.split("/shorts/")[1]?.split("?")[0];
  return `https://www.youtube.com/embed/${id}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0`;
};

const VideoShowcase = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(0); 
  const [videoState, setVideoState] = useState(videos.map(() => ({ unmuted: false })));

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const isDragging = useRef(false);
  const startX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);

      setTimeout(() => {
        if (trackRef.current && !mobileView) {
          const firstCard = trackRef.current.querySelector(".video-card");
          if (firstCard) setCardWidth(firstCard.offsetWidth);
        }
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* --- GSAP Animation Engine --- */
  useEffect(() => {
    if (isMobile) {
      // 📱 MOBILE STACKED DECK
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        if (index === current) {
          // Top Active Card
          gsap.to(card, { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 10, duration: 0.5, ease: "power3.out" });
        } else if (index === current + 1) {
          // 2nd Card peeking underneath
          gsap.to(card, { x: 0, y: 35, scale: 0.9, rotate: 0, opacity: 0.8, zIndex: 5, duration: 0.5, ease: "power3.out" });
        } else if (index === current + 2) {
          // 3rd Card deep underneath
          gsap.to(card, { x: 0, y: 70, scale: 0.8, rotate: 0, opacity: 0.4, zIndex: 4, duration: 0.5, ease: "power3.out" });
        } else if (index < current) {
          // Swiped Away Cards (Hidden to the left)
          gsap.to(card, { x: -window.innerWidth - 100, rotate: -15, opacity: 0, scale: 1, zIndex: 11, duration: 0.5 });
        } else {
          gsap.to(card, { x: 0, y: 90, scale: 0.7, opacity: 0, zIndex: 1, duration: 0.5 });
        }
      });
    } else {
      // 💻 DESKTOP CAROUSEL
      const activeCenter = current + 1;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = Math.abs(activeCenter - index);
        const clampedDistance = Math.min(distance, 1);
        
        gsap.to(card, {
          x: 0, y: 0, rotate: 0, 
          scale: 1.15 - clampedDistance * 0.25,
          opacity: 1 - clampedDistance * 0.6,
          zIndex: Math.round(10 - distance * 5),
          duration: 0.6,
          ease: "power3.out"
        });
      });
    }
  }, [current, isMobile]);

  /* --- Swipe Logic Engine --- */
  const maxSlides = isMobile ? videos.length - 1 : videos.length - 3;
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0));
  const goNext = () => setCurrent((p) => Math.min(p + 1, maxSlides));

  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  };

  // ⭐ NEW: Real-time finger tracking
  const handleMove = (e) => {
    if (!isDragging.current || !isMobile) return;
    const currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX.current;

    const activeCard = cardRefs.current[current];
    if (activeCard) {
      // Moves the card exactly with your finger and tilts it slightly for realism
      gsap.set(activeCard, { x: diff, rotate: diff * 0.03 });
    }
  };

  const handleEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.type.includes("touch") ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX.current; // Notice the math flip here for easier reading

    if (isMobile) {
      const activeCard = cardRefs.current[current];
      
      // If swiped LEFT heavily (Next Card)
      if (diff < -70 && current < maxSlides) {
        goNext();
      } 
      // If swiped RIGHT heavily (Previous Card)
      else if (diff > 70 && current > 0) {
        goPrev();
      } 
      // Didn't swipe far enough? Snap the card perfectly back to the center!
      else {
        gsap.to(activeCard, { x: 0, rotate: 0, duration: 0.5, ease: "back.out(1.2)" });
      }
    } else {
      // Desktop simple threshold
      if (diff < -50) goNext();
      else if (diff > 50) goPrev();
    }
  };

  return (
    <section className="video-section">
      <h2 className="video-heading">Some videos we designed</h2>
      
      <div 
        className="slider-viewport" 
        onMouseDown={handleStart} 
        onMouseMove={handleMove} // ⭐ Added Mouse Move
        onMouseUp={handleEnd} 
        onMouseLeave={handleEnd} 
        onTouchStart={handleStart} 
        onTouchMove={handleMove} // ⭐ Added Touch Move
        onTouchEnd={handleEnd}
      >
        <div 
          ref={trackRef} 
          className="slider-track" 
          style={{ transform: isMobile ? "none" : `translateX(-${current * cardWidth}px)` }} 
        >
          {videos.map((video, index) => (
            <div key={index} className="video-card" ref={(el) => (cardRefs.current[index] = el)}>
              <div className="video-wrapper">
                <div className="swipe-overlay"></div>
                <iframe 
                  src={convertToEmbed(video.videoSrc)} 
                  className="video-element" 
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                ></iframe>
                {!videoState[index].unmuted && (
                  <div className="tap-to-unmute" onClick={(e) => { 
                    e.stopPropagation(); 
                    const iframe = document.querySelectorAll("iframe")[index];
                    if (iframe) {
                      iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "unMute" }), "*");
                      iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "playVideo" }), "*");
                    }
                    setVideoState(prev => prev.map((v, i) => i === index ? { unmuted: true } : v)); 
                  }}>
                    🔊 Tap for Sound
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button className="slider-nav prev" onClick={goPrev}>‹</button>
        <button className="slider-nav next" onClick={goNext}>›</button>
      </div>

      <div className="slider-dots">
        {Array.from({ length: maxSlides + 1 }).map((_, i) => (
          <button
            key={i}
            className={`dot ${current === i ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default VideoShowcase;