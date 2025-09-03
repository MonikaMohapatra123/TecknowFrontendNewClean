import React, { useState, useRef, useEffect } from "react";
import "./CareerHiring.css";
import { Link as RouterLink } from "react-router-dom";

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

const CareerHiring = ({ cards }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [barTop, setBarTop] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (itemsRef.current[selectedIndex]) {
      const el = itemsRef.current[selectedIndex];
      setBarTop(el.offsetTop);
      setBarHeight(el.offsetHeight);
    }
  }, [selectedIndex]);

  return (
    <div className="career-container">
      <div className="career-heading">
        <h1>Join our team for a successful career.</h1>
        <p>
          We are hiring for RCC Chimney / FGD / Tall Structure projects. <br />
          Project location – PAN India
        </p>
      </div>

      <div className="career-layout">
        {/* Left side job list */}
        <div className="career-left">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`career-position ${
                selectedIndex === index ? "active" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              {card.position}
            </div>
          ))}
        </div>

        {/* Vertical divider with blue marker */}
        <div className="career-divider">
          <div
            className="career-scrollbar"
            style={{
              top: barTop,
              height: barHeight,
            }}
          ></div>
        </div>

        {/* Right side job details */}
        <div className="career-right">
          <ul>
            <li>
              <strong>Position:</strong> {cards[selectedIndex].position}
            </li>
            <li>
              <strong>No. of Positions:</strong> {cards[selectedIndex].Openings}
            </li>
            <li>
              <strong>Place of Work:</strong> {cards[selectedIndex].Location}
            </li>
            <li>
              <strong>CTC:</strong> {cards[selectedIndex].CTC}
            </li>
          </ul>
          <p className="career-details">{cards[selectedIndex].details}</p>

          <Link to="/contact">
            <button className="apply-btn">Apply Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerHiring;
