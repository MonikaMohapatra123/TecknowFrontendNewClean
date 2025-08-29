import React from "react";
import "./ContactCards.css";
import { FaPhoneAlt, FaEnvelope, FaCommentDots } from "react-icons/fa";

const ContactCards = () => {
  return (
    <div className="contact-section">
      <div className="contact-card">
        <div className="contact-icon">
          <FaPhoneAlt />
        </div>
        <div className="contact-info">
          <h3>Call Us</h3>
          <p>+(65) 6778 6858</p>
        </div>
      </div>

      <div className="contact-card">
        <div className="contact-icon">
          <FaEnvelope />
        </div>
        <div className="contact-info">
          <h3>Email Us</h3>
          <p>sales@be-con.com</p>
        </div>
      </div>

      <div className="contact-card">
        <div className="contact-icon">
          <FaCommentDots />
        </div>
        <div className="contact-info">
          <h3>Message Us</h3>
          <p>Fill out the form below</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
