import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faQuestion, faBuilding, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getStoredData } from "../../JsonFiles/fetchData";

// Custom Link to scroll to top on click
const Link = ({ to, children, ...rest }) => {
  const handleClick = () => window.scrollTo(0, 0);
  return (
    <RouterLink to={to} onClick={handleClick} {...rest}>
      {children}
    </RouterLink>
  );
};

const Footer = () => {
  const [totalData, setTotalData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);

  const animationControls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = getStoredData();
        if (storedData) setTotalData(storedData[0]);

        const projectResponse = await fetch('https://technow-overseasbackend.vercel.app/projects');
        const projectData = await projectResponse.json();
        setProjects(Array.isArray(projectData) ? projectData : []);

        const servicesResponse = await fetch('https://technow-overseasbackend.vercel.app/services');
        const servicesData = await servicesResponse.json();
        setServices(Array.isArray(servicesData) ? servicesData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inView) animationControls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
  }, [animationControls, inView]);

  if (!totalData) return <div>Loading...</div>;

  return (
    <>
      {/* Top Cyan Line */}
      <hr className="footer-top-line" />

      <motion.footer
        className="footer-wrapper"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={animationControls}
      >
        {/* Scroll to Top Button */}
        {inView && (
          <button className="scrollToTopButton" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}

        {/* Footer Heading and Description */}
        <div className="HeadingBefore">
          <h1 className="Footer-headings">{totalData.FooterDescriptionHeader}</h1>
          <p className="Footer-Description">{totalData.FooterDescriptionPara}</p>
        </div>

        <div className="footer-container">
          {/* Projects Column */}
          <div className="footer-column">
            <FontAwesomeIcon icon={faBuilding} className="iconFooter" />
            <h2><Link to="/projects">Projects</Link></h2>
            <ul>
              {projects.slice(0, 6).map(project => (
                <li key={project.id}>
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <FontAwesomeIcon icon={faProjectDiagram} className="iconFooter" />
            <h2><Link to="/services">Area of Activities</Link></h2>
            <ul>
              {services.slice(0, 10).map(service => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About/Links Column */}
          <div className="footer-column">
            <FontAwesomeIcon icon={faQuestion} className="iconFooter" />
            <h2><Link to="/company">About Us</Link></h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/why-priya">Why Priya Infra?</Link></li>
              <li><Link to="/company">Company</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/career">Career</Link></li>
            </ul>
          </div>

          {/* Location Card */}
          <div className="location-cards-container">
            <div className="location-card">
              <img
                src={totalData.ImagesLogo}
                alt={totalData.CompanyName}
                className="footer-logo"
                loading="lazy"
              />
              <h2>
                <a href={totalData.CompanyLink} target="_blank" rel="noopener noreferrer">
                  {totalData.CompanyName}
                </a>
              </h2>
              <div>
                <p>Email: <a href={`mailto:${totalData.Email}`}>{totalData.Email}</a></p>
                <p>Head Office: <a href={totalData.Location1} target="_blank" rel="noopener noreferrer">{totalData.Address1}</a></p>
                <p><a href={totalData.Location2} target="_blank" rel="noopener noreferrer">{totalData.Address2}</a></p>
                <p><a href={totalData.Location3} target="_blank" rel="noopener noreferrer">{totalData.Address3}</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Footer White Bar */}
        <div className="footer-white-bar">
          <p>
            &copy; {new Date().getFullYear()} All rights reserved by {totalData.CompanyName}. Website Designed & Maintained by{" "}
            <a href="https://axiomos.in/" target="_blank" rel="noopener noreferrer" className="axiomos-link">
              AXIOMOS
            </a>
          </p>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
