import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AllPhotoSlider.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const AllPhotoSlider = ({ data }) => {
  const { id } = useParams();
  const currentData = data.find(item => item.id === parseInt(id));
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === currentData.photo.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? currentData.photo.length - 1 : prevSlide - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <h3 className='photoSlider-Heading'>What Difference Do We Offer?</h3>
      <div className="photo-slider">
        <button className="photoslider-button left" aria-label="Previous slide" onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="photo-container">
          <div className="photo-section" style={{ transform: `translateX(-${currentSlide * 40}%)` }}>
            {currentData && currentData.photo.map((photo, index) => (
              <img
                key={index}
                src={photo.image}
                alt={`Product ${index + 1}`}
                className="photoimg-slider"
              />
            ))}
          </div>
        </div>
        <button className="photoslider-button right" aria-label="Next slide" onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className='photodots-container'>
        <div className="photodots">
          {currentData && currentData.photo.map((_, index) => (
            <span key={index} className={index === currentSlide ? 'photodash active' : 'photodash'} onClick={() => goToSlide(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPhotoSlider;
