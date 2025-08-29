import React,{useEffect} from 'react';
import './CompanyPdfViewer.css';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CompanyPdfViewer = ({ data }) => {
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
    <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
    <div className="viewerPdf-container">
      
        <div className="headingPdf-container">
        <h1 className="headingPdf">Download Teknow Overseas Pvt Ltd.</h1>
      </div>
      <div className="viewerPdf-frame">
        <iframe
          src={data}
          width="100%"
          height="500"
          allowFullScreen
          frameBorder="0"
          title="Google Slides Viewer"
        ></iframe>
      </div>
      
      
    </div>
    </motion.div>
  );
};

export default CompanyPdfViewer;
