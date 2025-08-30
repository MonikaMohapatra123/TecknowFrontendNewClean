import React,{useEffect} from 'react';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './HomeAboutUs.css';

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

const HomeAboutUs = ({ data }) => {
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

  return (
    <div className='Aboutus-container'>
       <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >

      
      <div className='Aboutus-Section'>
        <div className='Aboutus-section1'>
          <div className='Aboutus-section1Left'>
            <Link to="/company">
              <h1>{data.AboutUsHeadingAbove}  
                <FontAwesomeIcon icon={faArrowRight} className="Aboutus-section1LeftIcon" />
              </h1>
            </Link>
            <h2>{data.AboutUsHeadingBelow}</h2>
          </div>
          <div className='Aboutus-section1Right'>
            <p>{data.AboutUsDescription}</p>
          </div>
        </div>
        <div className='Aboutus-section2'>
          <div className='Aboutus-section2Left'>
            <img src={data.AboutUsPhoto1} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" loading="lazy"/>
            <img src={data.AboutUsPhoto3} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" loading="lazy" />
          </div>
          <div className='Aboutus-section2Right'>
            <img src={data.AboutUsPhoto2} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" loading="lazy" />
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
}

export default HomeAboutUs;
