// import React from 'react';

// const NotFound = () => {
//   return (
//     <div>
//       <h1>404 Not Found</h1>
//       <p>The page you are looking for does not exist.</p>
//     </div>
//   );
// };

// export default NotFound;

import "./NotFound.css";

function NotFound() {
  return (
    <div className="display">
        <h1 className="display-notfound">404 Not found</h1>;
      <div className="display__img">
        <img src={require("../../Assets/Scarecrow.webp")} alt="404-Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" loading="lazy" />
      </div>
      <div className="display__content">
        <h2 className="display__content--info">I have bad news for you</h2>
        <p className="display__content--text">
          The page you are looking for might not exist or is temporarily
          unavailable
        </p>
      </div>
    </div>
  );
}

export default NotFound;