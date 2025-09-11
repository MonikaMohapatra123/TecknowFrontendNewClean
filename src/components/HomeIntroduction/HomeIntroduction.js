import React, { useState, useEffect, useCallback } from 'react';
import './HomeIntroduction.css';
import { getStoredData } from "../../JsonFiles/fetchData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faAngleLeft, faAngleRight, faCalendarCheck, faLightbulb, faHardHat } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as RouterLink } from 'react-router-dom';

const Link = React.memo(({ to, children, ...rest }) => {
  const handleClick = () => window.scrollTo(0, 0);
  return <RouterLink to={to} onClick={handleClick} {...rest}>{children}</RouterLink>;
});

function HomeIntroduction() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [homeIntroData, setHomeIntroData] = useState([]);
  const animationControls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    const storedData = getStoredData();
    if (storedData && storedData[0]?.HomeIntro) {
      setHomeIntroData(storedData[0].HomeIntro);
    } else {
      console.error("No HomeIntro data found in local storage.");
    }
  }, []);

  useEffect(() => {
    homeIntroData.forEach(item => {
      const img = new Image();
      img.src = item.HomeIntroImage;
    });
  }, [homeIntroData]);

  const nextCard = useCallback((increment) => {
    setCurrentCardIndex(prevIndex => {
      const totalCards = homeIntroData.length;
      return totalCards > 0 ? (prevIndex + increment + totalCards) % totalCards : 0;
    });
  }, [homeIntroData.length]);

  useEffect(() => {
    if (inView) {
      animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [animationControls, inView]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextCard(1);
    }, 10000);
    return () => clearInterval(timer);
  }, [nextCard]);

  const card = homeIntroData[currentCardIndex];
  if (!card) return <div>Loading...</div>;

  return (
    <div className="HomeIntro-container">
      <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
        <div
          className={`HomeIntro-card loaded`}
          style={{ backgroundImage: `url(${card.HomeIntroImage})` }}
        >
          {/* Side navigation buttons */}
          <button className="HomeIntro-side-nav HomeIntro-side-nav-left" onClick={() => nextCard(-1)} aria-label="Previous">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <div className="HomeIntro-content">
            <h2 className="HomeIntro-heading">
              Energy &<br />
              Infrastructure<br />
              Solutions
            </h2>
            <p className="HomeIntro-paragraph">{card.HomeIntroPara}</p>
            <Link to={card.HomeIntroLink} className="HomeIntro-link">
              {card.HomeIntroRedirect}
              <FontAwesomeIcon icon={faArrowRight} className="HomeIntro-iconRedirect" />
            </Link>
          </div>
          <button className="HomeIntro-side-nav HomeIntro-side-nav-right" onClick={() => nextCard(1)} aria-label="Next">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </motion.div>

      {/* Info cards section below hero */}
      <div className="HomeIntro-info-cards-section">
        <div className="HomeIntro-info-card">
          <FontAwesomeIcon icon={faCalendarCheck} className="HomeIntro-info-icon" />
          <div>
            <div className="HomeIntro-info-title">On Time, Every Time</div>
            <div className="HomeIntro-info-text">
              Timely project delivery is our promise.
            </div>
          </div>
        </div>
        <div className="HomeIntro-info-card">
          <FontAwesomeIcon icon={faLightbulb} className="HomeIntro-info-icon" />
          <div>
            <div className="HomeIntro-info-title">Smart Solutions</div>
            <div className="HomeIntro-info-text">
              We understand the value of every dollar.
            </div>
          </div>
        </div>
        <div className="HomeIntro-info-card">
          <FontAwesomeIcon icon={faHardHat} className="HomeIntro-info-icon" />
          <div>
            <div className="HomeIntro-info-title">Safety Pioneers</div>
            <div className="HomeIntro-info-text">
              Safety is more than just a protocol; it's a promise.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HomeIntroduction);
