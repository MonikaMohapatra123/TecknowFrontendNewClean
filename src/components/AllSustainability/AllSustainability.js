import React, {useEffect } from 'react';
import './AllSustainability.css'; // Import the CSS file

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
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

function AllSustainability({data}) {


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
    <div className="sustainability-container">
      <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
        <div className='conatin-sustainability'>
      <div className='left-sustainability'>
  <div className='image-containsustain'>
    <img src={data[0].sustainabilityimage} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" className='img-sustainability'></img>
  </div>
</div>
        <div className='right-sustainability'>
        <h1 className="sustainability-title">{data[0].sustainabilityHeader}</h1>
      <p className="sustainability-description">{data[0].sustainabilityPara}</p>
      <Link to={data[0].sustainabilityLink} className='link-sustain'>{data[0].sustainabilityLinkPara} <FontAwesomeIcon icon={faArrowRight} className="icon-arrowsustain" /></Link>
        </div>
      </div>
      </motion.div>
      
    </div>
  );
}

export default AllSustainability;
