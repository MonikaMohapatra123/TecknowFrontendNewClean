import React, { useState, useEffect, useCallback } from 'react';
import './HomeIntroduction.css'; // Import the CSS file
import { getStoredData } from "../../JsonFiles/fetchData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'; // Import the arrow icons
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

function HomeIntroduction() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [homeIntroData, setHomeIntroData] = useState([]);
  const animationControls = useAnimation();
  const [ref, inView] = useInView();

  // Fetch data from getStoredData
  useEffect(() => {
    const fetchData = async () => {
      const storedData = getStoredData();
      if (storedData && storedData[0]?.HomeIntro) {
        setHomeIntroData(storedData[0].HomeIntro);
      } else {
        console.error("No HomeIntro data found in local storage.");
      }
    };

    fetchData();
  }, []);

  // Function to go to the next card
  const nextCard = useCallback((increment) => {
    setCurrentCardIndex((prevIndex) => {
      const totalCards = homeIntroData.length;
      return totalCards > 0 ? (prevIndex + increment + totalCards) % totalCards : 0;
    });
  }, [homeIntroData.length]);

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

  // Automatically change the home content every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextCard(1); // Go to the next card
    }, 10000); // Change content every 10 seconds

    return () => clearInterval(timer); // Clean up the timer
  }, [nextCard]);

  // Get the current card
  const card = homeIntroData[currentCardIndex];

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="HomeIntro-container">
      <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
        <div className="HomeIntro-card" style={{ backgroundImage: `url(${card.HomeIntroImage})` }}>
          <div className="HomeIntro-content">
            <h2 className="HomeIntro-heading">{card.HomeIntroHeading}<span className="underscore">_</span></h2>
            <p className="HomeIntro-paragraph">{card.HomeIntroPara}</p>
            <Link to={card.HomeIntroLink} className="HomeIntro-link">
              {card.HomeIntroRedirect}<FontAwesomeIcon icon={faArrowRight} className="HomeIntro-iconRedirect" />
            </Link>
            <div className="HomeIntro-navigation">
              <FontAwesomeIcon icon={faAngleLeft} className="HomeIntro-icon" onClick={() => nextCard(-1)} />
              <FontAwesomeIcon icon={faAngleRight} className="HomeIntro-icon" onClick={() => nextCard(1)} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HomeIntroduction;
