import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './UploadContent.css';

const UploadContent = ({ onNext, onBack }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Refs for Animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const dropZoneRef = useRef(null);
  const helperRef = useRef(null);
  const noteRef = useRef(null);
  const btnRef = useRef(null);
  const fileListRef = useRef(null);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(dropZoneRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" }, "-=0.3")
        .fromTo(helperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(noteRef.current, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.2")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- File Handling Logic ---

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
    // Small animation when file is added
    if(fileListRef.current) {
        gsap.fromTo(fileListRef.current, {y: 10, opacity: 0}, {y:0, opacity:1, duration: 0.3});
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-container" ref={containerRef}>
        
        <h2 className="upload-heading" ref={titleRef}>
          Step 3: Upload Assets
          <span className="upload-subheading">Share your raw footage or photos</span>
        </h2>

        {/* Drag & Drop Zone */}
        <div 
          className={`drop-zone ${isDragging ? 'drag-active' : ''}`} 
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="drop-icon">☁️</div>
          <p className="drop-text">
            Drag & drop files here, or <span className="browse-link">browse</span>
          </p>
          <input 
            type="file" 
            multiple 
            onChange={handleFileInput} 
            className="file-input-hidden" 
            accept="image/*,video/*,.zip,.rar"
          />
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="file-list" ref={fileListRef}>
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <button className="remove-btn" onClick={() => removeFile(index)}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Helper Text */}
        <p className="upload-helper-text" ref={helperRef}>
          You can upload raw videos. No need to edit or trim them.
          <br/>
          <small>(Videos, Images, or ZIP files accepted)</small>
        </p>

        {/* Warning Note */}
        <div className="upload-note-box" ref={noteRef}>
          <span className="note-icon">⚠️</span>
          <p>
            <strong>Optional note:</strong> If content is missing, delivery time may increase.
          </p>
        </div>

        {/* Buttons */}
        <div className="upload-actions" ref={btnRef}>
          <button className="back-btn" onClick={onBack}>
            &larr; Back
          </button>
          
          <button 
            className="continue-btn" 
            onClick={() => onNext(files)}
          >
            {files.length > 0 ? 'Finish Order' : 'Skip & Finish'} &rarr;
          </button>
        </div>
                    

                    {/* Buttons */}
        <div className="upload-actions" ref={btnRef}>
          <button className="back-btn" onClick={onBack}>
            &larr; Back
          </button>
          
          <button 
            className="continue-btn" 
            onClick={() => onNext(files)}
          >
            {/* Changed from "Finish Order" to "Continue" */}
            Continue &rarr; 
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;