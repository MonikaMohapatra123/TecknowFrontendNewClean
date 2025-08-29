import React, { useEffect, useState } from 'react';
import './AllValues.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faShieldAlt, faHandshake, faUsers, faPeopleArrows, faClock, faSyncAlt } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getStoredData } from "../../JsonFiles/fetchData";

// Mapping of icon names to actual icon components
const iconMap = {
  faGem: faGem,
  faShieldAlt: faShieldAlt,
  faHandshake: faHandshake,
  faUsers: faUsers,
  faPeopleArrows: faPeopleArrows,
  faClock: faClock,
  faSyncAlt: faSyncAlt,
};

function AllValues() {
  const [valuesData, setValuesData] = useState(null); // State to store values data
  const animationControls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    // Fetch stored data and extract the required part
    const storedData = getStoredData();
    if (storedData && storedData[0]) {
      const { ValueHeader, ValuePara, ValueList } = storedData[0];
      setValuesData({ ValueHeader, ValuePara, ValueList });
    }
  }, []);

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

  if (!valuesData) {
    return <div>Loading...</div>; // Show a loading state until data is fetched
  }

  const { ValueHeader, ValuePara, ValueList } = valuesData;

  return (
    <motion.div
      className="value-container"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={animationControls}
    >
      <div className='value-left'>
        <h1 className="value-title">{ValueHeader}</h1>
        <p className="value-description">{ValuePara}</p>
      </div>
      <div className='value-right'>
        {/* Rendering value list */}
        <ul className='list-value'>
          {ValueList.map((item, index) => (
            <li key={index} className='AllValue-ContainLeftSide'>
              {/* Dynamically render the icon based on item.icon */}
              <h1 className='HeadingLeftSide'>
                <FontAwesomeIcon icon={iconMap[item.icon]} className='iconValue' />
                {item.ValueListHeader}
              </h1>
              <p className='ParaLeftSide'>{item.ValueListPara}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default AllValues;
