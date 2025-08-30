import React, { useState, useEffect, useCallback } from 'react';
import './CompanyTimeline.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CompanyTimeline = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  // Wrap the definition of goToNextCard in useCallback
  const goToNextCard = useCallback(() => {
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

  // Automatically change to the next card after 15 seconds
  useEffect(() => {
    const timer = setTimeout(goToNextCard, 10000); // 15 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, goToNextCard]);

  return (
    <div className='TimelineSlider-container'>
      <motion.div
        className="Timeline-slider"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
        <div className="Timeline-container">
          <div
            key={currentIndex}
            className="Timeline-about active"
          >
            <div className="Timelineright-section">
              <h1 className='heading-RightTimeline'>"Journey of Priya Infra Over the Years"</h1>
              <div className="Timeline-content">
                <h1 className='Timeline-contentYear'>{cards[currentIndex].Year}</h1>
                <h2 className='Timeline-contentHeading'>{cards[currentIndex].heading}</h2>
                <p className='Timeline-contentDescription'>{cards[currentIndex].description}</p>
              </div>
              <div className='TimelinesliderSection'>
                <FontAwesomeIcon icon={faChevronLeft} className="Timelineslider-button left" onClick={goToPrevCard} />
                <div className='Timelineindex-total'>
                  {currentIndex + 1}/{cards.length}
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="Timelineslider-button right" onClick={goToNextCard} />
              </div>
            </div>
            <div className="Timelineleft-section">
              <img src={cards[currentIndex].image} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" className='Timelineimg-slider'  loading="lazy"/>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyTimeline;
