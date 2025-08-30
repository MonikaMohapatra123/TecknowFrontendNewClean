import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './HomeIntroduction.css';
import { getStoredData } from "../../JsonFiles/fetchData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as RouterLink } from 'react-router-dom';

// ✅ Memoized Link wrapper
const Link = React.memo(({ to, children, ...rest }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <RouterLink to={to} onClick={handleClick} {...rest}>
      {children}
    </RouterLink>
  );
});

// ✅ Memoized Navigation Icons
const Navigation = React.memo(({ onPrev, onNext }) => (
  <div className="HomeIntro-navigation">
    <FontAwesomeIcon icon={faAngleLeft} className="HomeIntro-icon" onClick={onPrev} />
    <FontAwesomeIcon icon={faAngleRight} className="HomeIntro-icon" onClick={onNext} />
  </div>
));

function HomeIntroduction() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [homeIntroData, setHomeIntroData] = useState([]);
  const animationControls = useAnimation();
  const [ref, inView] = useInView();

  // ✅ Fetch data
  useEffect(() => {
    const storedData = getStoredData();
    if (storedData && storedData[0]?.HomeIntro) {
      setHomeIntroData(storedData[0].HomeIntro);
    } else {
      console.error("No HomeIntro data found in local storage.");
    }
  }, []);

  // ✅ Preload images for smoother transitions
  useEffect(() => {
    homeIntroData.forEach(item => {
      const img = new Image();
      img.src = item.HomeIntroImage;
    });
  }, [homeIntroData]);

  // ✅ Next/Prev card
  const nextCard = useCallback((increment) => {
    setCurrentCardIndex(prevIndex => {
      const totalCards = homeIntroData.length;
      return totalCards > 0 ? (prevIndex + increment + totalCards) % totalCards : 0;
    });
  }, [homeIntroData.length]);

  // ✅ Animate when in view
  useEffect(() => {
    if (inView) {
      animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [animationControls, inView]);

  // ✅ Auto-change every 10s
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
          className={`HomeIntro-card loaded`} // ✅ "loaded" avoids flicker
          style={{ backgroundImage: `url(${card.HomeIntroImage})` }}
        >
          <div className="HomeIntro-content">
            <h2 className="HomeIntro-heading">
              {card.HomeIntroHeading}
              <span className="underscore">_</span>
            </h2>
            <p className="HomeIntro-paragraph">{card.HomeIntroPara}</p>
            <Link to={card.HomeIntroLink} className="HomeIntro-link">
              {card.HomeIntroRedirect}
              <FontAwesomeIcon icon={faArrowRight} className="HomeIntro-iconRedirect" />
            </Link>
            <Navigation onPrev={() => nextCard(-1)} onNext={() => nextCard(1)} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default React.memo(HomeIntroduction);
