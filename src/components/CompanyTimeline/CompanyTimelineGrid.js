import React, { useState, useCallback, useEffect } from 'react';
import './CompanyTimelineGrid.css'; // Import CSS for styling
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PhotoSlider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left

  // Navigate to the next card
  const goToNextCard = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  }, [cards.length]);

  // Define animations
  const animationControls = useAnimation();
  const [ref, inView] = useInView();

  // Animate when the element comes into view
  useEffect(() => {
    if (inView) {
      animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [animationControls, inView]);

  // Automatically change to the next card after 10 seconds
  useEffect(() => {
    const timer = setTimeout(goToNextCard, 100000); 
    return () => clearTimeout(timer);
  }, [currentIndex, goToNextCard]);

  const handleDotClick = (index) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 1 : -1); // Determine the direction
      setCurrentIndex(index);
    }
  };

  return (
    <div className='PhotoSlider-container'>
      <motion.div
        className="PhotoSlider-slider"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
        <motion.div
          className="PhotoSlider-background"
          style={{ backgroundImage: `url(${cards[currentIndex].image})` }}
          initial={{ x: direction === 1 ? 800 : -800, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 1 ? -800 : 800, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          key={currentIndex}
        >
          <div className="PhotoSlider-content">
            <div className="PhotoSlider-text">
              <h2 className='PhotoSlider-heading'>{cards[currentIndex].heading}</h2>
              <p className='PhotoSlider-description'>{cards[currentIndex].description}</p>
            </div>
            <div className="PhotoSlider-year">
              <h1 className='PhotoSlider-yearText'>{cards[currentIndex].Year}</h1>
            </div>
          </div>
          <div className="PhotoSlider-dots">
            {cards.map((card, index) => (
              <div key={index} className='PhotoSlider-YearContainer'>
                {index === currentIndex && (
                  <div className="PhotoSlider-dot-year">{card.Year}</div>
                )}
                <div
                  className={`PhotoSlider-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                >
                  {index === currentIndex && (
                    <div className="PhotoSlider-dot-year">{card.Year}</div>
                  )}
                  <div className="PhotoSlider-dot-inner" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PhotoSlider;
