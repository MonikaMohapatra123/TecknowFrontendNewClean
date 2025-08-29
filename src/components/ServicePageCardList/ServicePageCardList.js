
import React, { useEffect } from 'react';
import './ServicePageCardList.css'; // Import the CSS file
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

function ServicePageCardList({ data, projects }) {
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
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={animationControls}
    >
      <div className="CardList-container" style={{ backgroundImage: `url(${data.image})` }}>
        <div className='CardList-content'>
          <h1 className='CardList-heading'>{data.title}</h1>
          <p className='CardList-Para'>{data.description}</p>
          <Link to={`/services/${data.id}`} className="CardList-Link">
            {data.CardListLinkPara}
            <FontAwesomeIcon icon={faArrowRight} className="icon-ServiceCard" />
          </Link>

          <div className='count-Services'>
            <div className="count-wrapper">
              <p className='CardList-Count'>{data.CardListCount + "+"}</p>
              <p className='CardList-CountPara'>{data.CardListPara}</p>
            </div>
            <div className="count-wrapper">
              <p className='CardList-Count'>{data.CardListCount2 + "+"}</p>
              <p className='CardList-CountPara'>{data.CardListPara2}</p>
            </div>
          </div>
        </div>

        <div className='BlurService-Projects'>
          <div className="project-partition">
            <h3 className='headingProjectsBlur'>Projects</h3>
            {data.projects?.slice(0, 7).map((projectId) => {
              const project = projects.find((proj) => proj.id === projectId);

              // Skip rendering if project not found
              if (!project) {
                console.warn(`No project found for ID: ${projectId}`);
                return null;
              }

              return (
                <div key={project.id} className="project-card">
                  <Link to={`/projects/${project.id}`} className="LinkProjectsServices">
                    {project.title}
                    <FontAwesomeIcon icon={faArrowRight} className="icon-ServiceCard" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ServicePageCardList;

