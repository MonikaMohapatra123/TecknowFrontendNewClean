import React, { useEffect } from 'react';
import './AllContactUs.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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

function AllContactUs({ data }) {
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
    <motion.div
      className="contact-container"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={animationControls}
    >
      <div className='contact-leftside'>
        <h1 className="contact-title">{data[0].ContactHeader}</h1>
      </div>
      <div className='contact-rightside'>
        <p className="contact-description">{data[0].ContactDescription}</p>
        <Link to={data[0].ContactLink}><button className='contactus-Button'>Contact Us<FontAwesomeIcon icon={faUser} className='icon-ContactUs'/></button></Link>
      </div>
    </motion.div>
  );
}

export default AllContactUs;
