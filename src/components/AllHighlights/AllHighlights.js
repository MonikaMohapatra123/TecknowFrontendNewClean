import React, { useState, useEffect, useRef } from 'react';
import './AllHighlights.css';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { Parallax } from 'react-parallax';

function AllHighlights({ data }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCounts, setCurrentCounts] = useState(Array(data[0].length).fill(0));
  const highlightsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (highlightsRef.current) {
        const top = highlightsRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsVisible(top < windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentCounts(prevCounts =>
          prevCounts.map((count, index) => (count < data[0][index].count ? count + 1 : count))
        );
      }, 2); // adjust the interval as needed for smoother animation
      return () => clearInterval(interval);
    }
  }, [isVisible, data]);



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
    <div className='mainHigh-container'>
      <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
       

        
        {/* <h1 className='high-heading'>HIGHLIGHTS</h1> */}
        {/* <Parallax strength={500} bgImage="/images/parallaximage1.webp" className="highparallax-section"> */}
      <div className='high-container' ref={highlightsRef}>
      
      {data[0].map(({ name }, index) => (
        <div key={index} className='highlight-item'>
          <p className='high-count'>{currentCounts[index]} + </p>
          <h2 className='high-highlights'>{name}</h2>
        </div>
      ))}
    </div>
    {/* </Parallax> */}
      </motion.div>
      
      </div>
    
  );
}

export default AllHighlights;

