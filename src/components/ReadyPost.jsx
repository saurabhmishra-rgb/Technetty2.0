import React from 'react';
import "./ReadyPost.css";

const ReadyPost = () => {
  return (
    <section className="ready-post-wrapper">
      <div className="reels-banner">
        
        {/* The content sits on top of the background & overlay */}
        <div className="overlay">
          <span className="premium-badge">
            <span className="badge-icon">✳</span> JUSTREELS
          </span>

          <h1>
            Ready to post <br className="mobile-break" />
            <span className="gradient-highlight">better reels?</span>
          </h1>

          <p>No contracts. No influencer pricing. Just pure growth.</p>

          <button className="premium-cta">Get Started Now</button>
        </div>
        
      </div>
    </section>
  );
}

export default ReadyPost;