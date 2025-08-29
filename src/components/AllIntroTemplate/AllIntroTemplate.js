import React,{useEffect} from 'react';
import './AllIntroTemplate.css'; // Import the CSS file

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AllIntroTemplate({ title, description, image }) {
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

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={animationControls}>
      <div className="IntroTemplate-intro" style={{backgroundImage: inView ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${image})` : 'none'}}>
        <div className='careerintro-padding'>
          <h1 className="IntroTemplate-title">{title}<span className="underscore">_</span></h1>
          <div className='line-introtemplate'></div>
          <p className="IntroTemplate-description">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}


export default AllIntroTemplate;

