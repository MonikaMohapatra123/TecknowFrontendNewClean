import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./OfficeImages.css";

function OfficeImages({ image }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideNext = () => {
    if (!image || image.length === 0) return;
    setActiveIndex((prevIndex) =>
      prevIndex === image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const slidePrev = () => {
    if (!image || image.length === 0) return;
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? image.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    if (!image || image.length === 0) return;
    setActiveIndex(index);
  };

  return (
    <div className="OfficeImageContain">
      <div className="container__slider">
        <div className="slider__item">
          {image && image.length > 0 && image[activeIndex] ? (
            <img
              src={image[activeIndex].image}
              alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="container__slider__links">
          {image && image.length > 0 && image.map((_, index) => (
            <button
              key={index}
              className={
                activeIndex === index
                  ? "container__slider__links-small container__slider__links-small-active"
                  : "container__slider__links-small"
              }
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>

        {image && image.length > 1 && (
          <>
            <button className="slider__btn-next" onClick={slideNext}>
              <FontAwesomeIcon icon={faChevronRight} className="slider__btn-Icon" />
            </button>
            <button className="slider__btn-prev" onClick={slidePrev}>
              <FontAwesomeIcon icon={faChevronLeft} className="slider__btn-Icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OfficeImages;
