import React from "react";
import { motion } from "framer-motion";

import LogoSlider1 from "../../Assets/LogoSlider1.svg";
import LogoSlider2 from "../../Assets/LogoSlider2.svg";
import LogoSlider3 from "../../Assets/LogoSlider3.svg";
import LogoSlider4 from "../../Assets/LogoSlider4.svg";
import LogoSlider5 from "../../Assets/LogoSlider5.svg";
import LogoSlider6 from "../../Assets/LogoSlider6.svg";
import LogoSlider7 from "../../Assets/LogoSlider7.svg";
import LogoSlider8 from "../../Assets/LogoSlider8.svg";
import LogoSlider9 from "../../Assets/LogoSlider9.svg";
import LogoSlider10 from "../../Assets/LogoSlider10.svg";
import LogoSlider11 from "../../Assets/LogoSlider11.svg";
import LogoSlider12 from "../../Assets/LogoSlider12.svg";
import LogoSlider13 from "../../Assets/LogoSlider13.svg";
import LogoSlider14 from "../../Assets/LogoSlider14.svg";
import LogoSlider15 from "../../Assets/LogoSlider15.svg";
import LogoSlider16 from "../../Assets/LogoSlider16.svg";
import LogoSlider17 from "../../Assets/LogoSlider17.svg";
import LogoSlider18 from "../../Assets/LogoSlider18.svg";
import LogoSlider19 from "../../Assets/LogoSlider19.svg";

import "./HomeIconSlider.css";

// All logos
const allSlides = [
  LogoSlider1, LogoSlider2, LogoSlider3, LogoSlider4, LogoSlider5,
  LogoSlider6, LogoSlider7, LogoSlider8, LogoSlider9, LogoSlider10,
  LogoSlider11, LogoSlider12, LogoSlider13, LogoSlider14, LogoSlider15,
  LogoSlider16, LogoSlider17, LogoSlider18, LogoSlider19,
];

// Split into two sets
const topRowSlides = allSlides.slice(0, Math.ceil(allSlides.length / 2));
const bottomRowSlides = allSlides.slice(Math.ceil(allSlides.length / 2));

const HomeIconSlider = () => {
  // Duplicate for infinite loop
  const duplicatedTop = [...topRowSlides, ...topRowSlides];
  const duplicatedBottom = [...bottomRowSlides, ...bottomRowSlides];

  return (
    <div className="slider-section">
      <h2 className="slider-title">Satisfied Customers</h2>

      <div className="slider-container">
        {/* Top Row */}
        <motion.div
          className="slider-row"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {duplicatedTop.map((logo, i) => (
            <img key={`top-${i}`} src={logo} alt={`Client ${i}`} className="icon" />
          ))}
        </motion.div>

        {/* Bottom Row - opposite direction */}
        <motion.div
          className="slider-row"
          animate={{ x: ["-100%", "0%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {duplicatedBottom.map((logo, i) => (
            <img key={`bottom-${i}`} src={logo} alt={`Client ${i}`} className="icon" />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomeIconSlider;
