import React, { useEffect } from 'react';
import './SustainabilityServiceCatelogs.css'; // Import the CSS file
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";






function SustainabilityServiceCatelogs({ data }) {

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
    <div className="ServicesCat-container">
      <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
        
      <div className='card-servicesall'>
        {data.map((item) => (
          <div key={item.id} className="cardservices-container">
            
              <img src={item.image} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" className='Sustaincardservices-image'/>
              <h3 className='Sustaincardservices-title'>{item.title}</h3>
              <div className="cardservices-overlay">
                <p className='Sustaincardservices-description'>{item.description}</p>
              </div>
            
          </div>
        ))}
      </div>
      </motion.div>
      
    </div>
  );
}

export default SustainabilityServiceCatelogs;