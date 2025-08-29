import React, { useState } from "react";
import "./Accordion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBullseye, faGem, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      id: 1,
      title: "OUR VISION",
      icon: faEye,
      content: `Empowering a Sustainable Energy Future: Our vision is to be a globally recognized leader in construction and infrastructure solutions for the emission of gas, storage, material handling and cooling sector. We aim to revolutionize the industry by delivering pioneering projects that harness renewable energy, enhance grid reliability, and minimize environmental impact. Through innovation, collaboration, and unwavering commitment to sustainability, we envision a future where clean and reliable energy powers a more sustainable world for generations to come.`
    },
    {
      id: 2,
      title: "OUR MISSION",
      icon: faBullseye,
      content: `Our mission is to deliver world-class infrastructure projects with excellence, innovation, and integrity. We focus on building sustainable solutions that empower industries, reduce carbon footprint, and create long-term value for stakeholders while contributing to global energy efficiency.`
    },
    {
      id: 3,
      title: "OUR VALUES",
      icon: faGem,
      content: `Integrity, Innovation, Sustainability, Collaboration, and Excellence are the core values that guide our operations. We are committed to fostering trust, driving progress with new ideas, respecting the environment, and achieving outstanding results for our clients and communities.`
    }
  ];

  return (
    <div className="accordion-container">
      {accordionData.map((item, index) => (
        <div key={item.id} className="accordion-item">
          <div className="accordion-header" onClick={() => toggleAccordion(index)}>
            <FontAwesomeIcon icon={item.icon} className="accordion-icon" />
            <span className="accordion-title">{item.title}</span>
            <FontAwesomeIcon
              icon={activeIndex === index ? faMinus : faPlus}
              className="accordion-toggle"
            />
          </div>
          {activeIndex === index && (
            <div className="accordion-content">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
