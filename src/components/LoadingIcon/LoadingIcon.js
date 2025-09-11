import React from 'react';
import './LoadingIcon.css'; // Import CSS for styling the loading icon
import logo from "../../Assets/logobg.jpeg";

const LoadingIcon = () => {
  return (
    <div className="loading-container">
      <div className="circle-spinner">
        <img
          src={logo}
          alt="Company Logo"
          className="logo"
          width="40"
          height="40"
          loading="lazy"
        />
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingIcon;
