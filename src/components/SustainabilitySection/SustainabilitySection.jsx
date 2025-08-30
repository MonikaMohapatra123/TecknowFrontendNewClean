import React from "react";
import "./SustainabilitySection.css";

const SustainabilitySection = () => {
  return (
    <div className="sustainability-container">
      <div className="sustainability-image">
        <img src="/0.jpg" alt="Sustainability at Teknow"  loading="lazy"/>
      </div>
      <div className="sustainability-content">
        <h2>Building a Greener Tomorrow</h2>
        <p>
          At <strong>Teknow</strong>, we believe true progress means creating 
          infrastructure that respects both people and the planet. Our 
          projects are designed with sustainability at the core—ensuring 
          long-lasting value while minimizing environmental impact.
        </p>
        <p>
          From adopting <strong>energy-efficient equipment</strong> and{" "}
          <strong>low-carbon construction materials</strong> to optimizing 
          <strong> water management systems</strong>, we integrate green 
          practices at every stage of development. We also encourage the 
          reuse of construction materials and prioritize local sourcing to 
          reduce our carbon footprint.
        </p>
        <p>
          Beyond construction, Teknow actively contributes to{" "}
          <strong>tree plantation drives</strong>, <strong>waste reduction programs</strong>, 
          and <strong>eco-friendly site planning</strong>. Each initiative 
          reflects our responsibility toward building resilient communities 
          and protecting natural resources for future generations.
        </p>
        <p>
          Guided by innovation, safety, and sustainability, Teknow is not just 
          constructing structures—we are shaping a future where development 
          and environmental care go hand in hand.
        </p>
      </div>
    </div>
  );
};

export default SustainabilitySection;
