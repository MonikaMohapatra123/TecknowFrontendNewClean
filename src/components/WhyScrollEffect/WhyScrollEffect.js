import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import { motion, useAnimation } from 'framer-motion';
import './WhyScrollEffect.css'; // Import the CSS file
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

function WhyScrollEffect({ data }) {
  // Define animation controls
  const animationControls = useAnimation();

  // State to track the screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);

  // Update the state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate when component mounts
  useEffect(() => {
    animationControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: 'easeInOut' }, // Adjust duration and add easing
    });
  }, [animationControls]);

  return (
    <motion.div
      className="ScrollEffect-container"
      initial={{ opacity: 0, y: 300 }}
      animate={animationControls}
    >
      {isMobile ? (
        <>
          <div className="parallax-section" style={{ backgroundImage: 'url(/images/construction1.webp)' }}>
            <div className='ScrollEffectFirst-card'>
              <h1 className="ScrollEffect-title2">{data[0].ScrollEffectHeader}</h1>
              <p className='ScrollEffect-Para2'>{data[0].ScrollEffectPara1}</p>
            </div>
          </div>

          <div className="parallax-section" style={{ backgroundImage: 'url(/images/construction2.webp)' }}>
            <div className='ScrollEffectSecond-card'>
              <h1 className="ScrollEffect-title">{data[0].ScrollEffectHeader2}</h1>
              <p className='ScrollEffect-Para'>{data[0].ScrollEffectPara2}</p>
            </div>
          </div>

          <div className="parallax-section" style={{ backgroundImage: 'url(/images/construction3.webp)' }}>
            <div className='ScrollEffectFirst-card'>
              <Link to="/projects">
                <h1 className='ScrollEffect-title2'>{data[0].ScrollEffectProjectsHead}</h1>
                <p className='ScrollEffect-Para2'>{data[0].ScrollEffectprojectsPara}</p>
              </Link>
            </div>
          </div>

          <div className="parallax-section" style={{ backgroundImage: 'url(/images/construction4.webp)' }}>
            <div className='ScrollEffectSecond-card'>
              <Link to="/projects">
                <h1 className='ScrollEffect-title'>{data[0].ScrollEffectServicesHead}</h1>
                <p className='ScrollEffect-Para'>{data[0].ScrollEffectServicesPara}</p>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <Parallax strength={300} bgImage="/images/construction1.webp" className="parallax-section">
            <div className='ScrollEffectFirst-card'>
              <h1 className="ScrollEffect-title2">{data[0].ScrollEffectHeader}</h1>
              <p className='ScrollEffect-Para2'>{data[0].ScrollEffectPara1}</p>
            </div>
          </Parallax>

          <Parallax strength={300} bgImage="/images/construction2.webp" className="parallax-section">
            <div className='ScrollEffectSecond-card'>
              <h1 className="ScrollEffect-title">{data[0].ScrollEffectHeader2}</h1>
              <p className='ScrollEffect-Para'>{data[0].ScrollEffectPara2}</p>
            </div>
          </Parallax>

          <Parallax strength={300} bgImage="/images/construction3.webp" className="parallax-section">
            <div className='ScrollEffectFirst-card'>
              <Link to="/projects">
                <h1 className='ScrollEffect-title2'>{data[0].ScrollEffectProjectsHead}</h1>
                <p className='ScrollEffect-Para2'>{data[0].ScrollEffectprojectsPara}</p>
              </Link>
            </div>
          </Parallax>

          <Parallax strength={300} bgImage="/images/construction4.webp" className="parallax-section">
            <div className='ScrollEffectSecond-card'>
              <Link to="/projects">
                <h1 className='ScrollEffect-title'>{data[0].ScrollEffectServicesHead}</h1>
                <p className='ScrollEffect-Para'>{data[0].ScrollEffectServicesPara}</p>
              </Link>
            </div>
          </Parallax>
        </>
      )}
    </motion.div>
  );
}

export default WhyScrollEffect;
