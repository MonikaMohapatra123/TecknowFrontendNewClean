import React, { useEffect } from 'react';
import './HomeServicesCatelogs.css'; // Import the CSS file
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";




const Link = ({ to, children, ...rest }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <RouterLink to={to} onClick={handleClick} className='LinkServices' {...rest}>
      {children}
    </RouterLink>
  );
};


function HomeServicesCatelogs({ data, details }) {

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
    <div className="ServicesCat-container">
      <motion.div
        className="animated-section"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={animationControls}
      >
        
        <div className='headertop-services'>
        <div className='headertop-right'>
        <h1 className="ServicesCat-title">{details.ServicesCatTitle + "_"}</h1>
        </div>

        <div className='headertop-left'>
        <p className="ServicesCat-description">{details.ServicesCatDescription}</p>
        <Link to={details.ServicesLink} className='LinkServices'> {details.ServicesCatLinkName} <FontAwesomeIcon icon={faArrowRight} className='iconServices'/></Link>
        </div>
      </div>

      <div className='card-servicesall'>
        {data.map((item) => (
          <div key={item.id} className="cardservices-container">
            <Link to={`/services/${item.id}`}>
              <img src={item.image} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" className='cardservices-image'/>
              <h1 className='cardservices-title'>{item.title}</h1>
              <div className="cardservices-overlay">
                <p className='cardservices-description'>{item.description}</p>
                <Link to={`/services/${item.id}`} className='LinkServices2'>Futher Information<FontAwesomeIcon icon={faArrowRight} className='iconServices'/></Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </motion.div>
      
    </div>
  );
}

export default HomeServicesCatelogs;
