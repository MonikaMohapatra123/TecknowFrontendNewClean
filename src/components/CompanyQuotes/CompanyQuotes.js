import React, { useEffect } from 'react';
import './CompanyQuotes.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


function CompanyQuotes({ data }) {
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
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={animationControls}>
      <div className="Quotes-container">
        <div className="Quotes-border">
          <div className="Quotes-DetailsContainer">
            <FontAwesomeIcon icon={faQuoteLeft} className="Quote-Left" />
            <h1 className="Quotes-Details">{data.quoteDetails}</h1>
            <FontAwesomeIcon icon={faQuoteRight} className="Quote-Right" />
          </div>

          <div className="Quotes-ceoSection">
            <div className='Quotes-ImageCircle'>
            <img src={data.quotesImage} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" loading="lazy" className="quotes-Image" />
            </div>
            <p className="Quotes-Name">{data.quotesName}</p>
            <p className="Quotes-Designation">{data.quotesDesignation}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CompanyQuotes;
