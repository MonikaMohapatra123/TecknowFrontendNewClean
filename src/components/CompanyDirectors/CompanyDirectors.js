import React, { useState, useEffect } from "react";
import "./CompanyDirectors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CompanyDirectors = ({ cards }) => {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [currentDirectorIndex, setCurrentDirectorIndex] = useState(0);

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

  if (!cards || cards.length === 0) {
    return <div>No directors available to display.</div>;
  }

  const currentDirector =
    cards?.[currentCompanyIndex]?.companyStackHolder?.[currentDirectorIndex] || {};

  const { image = "", position = "Unknown Position", name = "Unknown Name", details = "No details available." } = currentDirector;

  const goToPrevCard = () => {
    setCurrentDirectorIndex((prevIndex) => {
      if (prevIndex === 0) {
        const newCompanyIndex = (currentCompanyIndex === 0 ? cards.length : currentCompanyIndex) - 1;
        setCurrentCompanyIndex(newCompanyIndex);
        return (cards[newCompanyIndex]?.companyStackHolder?.length || 1) - 1;
      }
      return prevIndex - 1;
    });
  };

  const goToNextCard = () => {
    setCurrentDirectorIndex((prevIndex) => {
      const isLastDirector =
        prevIndex === (cards[currentCompanyIndex]?.companyStackHolder?.length || 1) - 1;
      if (isLastDirector) {
        const newCompanyIndex = (currentCompanyIndex + 1) % cards.length;
        setCurrentCompanyIndex(newCompanyIndex);
        return 0;
      }
      return prevIndex + 1;
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={animationControls}
    >
      <h1 className="directorcardSlider-Heading">Our StackHolders</h1>

      <div className="directorcard-slider">
        <button
          className="directorslider-button left"
          aria-label="Previous slide"
          onClick={goToPrevCard}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="directorcard-container">
          <div className="directorcard-about active">
            <div className="directorleft-section">
              {/* <img
                src={image}
                alt={`Image of ${name}`}
                className="directorimg-slider"
              /> */}
              <img
              src={image}
              alt={name}
              className="directorimg-slider" loading="lazy"
            />

            </div>
            <div className="directorright-section">
              <div className="directorcard-content">
                <h2>{position}</h2>
                <p className="directorParaName">{name}</p>
                <p className="directorParaDetails">{details}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="directorslider-button right"
          aria-label="Next slide"
          onClick={goToNextCard}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="directordots-container">
        <div className="directordots">
          {cards.map((company, companyIndex) =>
            company.companyStackHolder?.map((_, directorIndex) => (
              <span
                key={`${companyIndex}-${directorIndex}`}
                className={
                  companyIndex === currentCompanyIndex &&
                  directorIndex === currentDirectorIndex
                    ? "directordash active"
                    : "directordash"
                }
                onClick={() => {
                  setCurrentCompanyIndex(companyIndex);
                  setCurrentDirectorIndex(directorIndex);
                }}
              />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

CompanyDirectors.defaultProps = {
  cards: [],
};

export default CompanyDirectors;
