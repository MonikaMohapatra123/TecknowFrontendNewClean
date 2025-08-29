import React, { useState, useEffect } from 'react';
import './CareerHiring.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, children, ...rest }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <RouterLink to={to} onClick={handleClick} {...rest}>
      {children}
    </RouterLink>
  );
};

const CareerHiring = ({ cards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track the current job opening index
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

  const goToPrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={animationControls}
    >
      <h1 className="HiringcardSlider-Heading">CURRENT OPENINGS</h1>

      <div className="Hiringcard-slider">
        <button className="Hiringslider-button left" aria-label="Previous slide" onClick={goToPrevCard}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="Hiringcard-container">
          <div className="Hiringcard-about active">
            <div className="Hiringright-section">
              <div className="Hiringcard-content">
                <h2>{cards[currentCardIndex].position}</h2>
                <p className="HiringParaExperience">Experience: {cards[currentCardIndex].Experience}</p>
                <p className="HiringParaOpenings">Openings: {cards[currentCardIndex].Openings}</p>
                <p className="HiringParaQualification">Qualification: {cards[currentCardIndex].Qualification}</p>
                <p className="HiringParaLocation">Location: {cards[currentCardIndex].Location}</p>
                <p className="HiringParaDetails">{cards[currentCardIndex].details}</p>
                <Link to="/contact">
                  <button className="contactus-Button">
                    Apply Now
                    <FontAwesomeIcon icon={faUser} className="icon-ContactUs" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button className="Hiringslider-button right" aria-label="Next slide" onClick={goToNextCard}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="Hiringdots-container">
        <div className="Hiringdots">
          {cards.map((_, index) => (
            <span
              key={index}
              className={index === currentCardIndex ? 'Hiringdash active' : 'Hiringdash'}
              onClick={() => setCurrentCardIndex(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CareerHiring;
