import React, { useState, useEffect } from 'react';
import './AllProjects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as RouterLink } from 'react-router-dom';

// Custom Link to scroll to top on click
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

const AllProjects = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback to empty array if cards is undefined or not an array
  const visibleCards = Array.isArray(cards) ? cards.slice(0, 8) : [];

  const goToPrevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? visibleCards.length - 1 : prevIndex - 1
    );
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === visibleCards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const animationControls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [animationControls, inView]);

  const currentCard = visibleCards[currentIndex];

  // If there's no data, don't render the component
  if (!currentCard) {
    return null;
  }

  return (
    <div className='cardSlider-container'>
      <motion.div
        className="card-slider"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="card-container">
          <div className="card-about active">
            <div className="left-section">
              <img
                src={currentCard.image}
                alt={currentCard.title}
                className='img-slider'
                loading="lazy"
              />
            </div>
            <div className="right-section">
              <h1 className='heading-RightCard'>Discover Our Projects_</h1>
              <div className="card-content">
                <Link to={`/projects/${currentCard.id}`}>
                  <h2>{currentCard.title}</h2>
                </Link>
                <p>{currentCard.location}</p>
                <p>{currentCard.description}</p>
              </div>
              <div className='sliderSection'>
                <FontAwesomeIcon icon={faChevronLeft} className="slider-button left" onClick={goToPrevCard} />
                <div className='index-total'>
                  {currentIndex + 1}/{visibleCards.length}
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="slider-button right" onClick={goToNextCard} />
              </div>
              <Link to="/projects" className="Link-Projects">
                Find More of Our Case Studies
                <FontAwesomeIcon icon={faArrowRight} className="HomeIntro-iconRedirect" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AllProjects;
