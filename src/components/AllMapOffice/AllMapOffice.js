import React,{useEffect} from 'react';
import './AllMapOffice.css';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AllMapOffice({ data,title }) {


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
    
    <div className='mapContainer'>
       <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
        <h1 className='headingMap'>{title}</h1>
        <img src={data} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" className="map-image" loading="lazy" />
      </motion.div>
      
    </div>
  );
}

export default AllMapOffice;
