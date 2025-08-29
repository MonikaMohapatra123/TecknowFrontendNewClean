import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import { getStoredData } from "../../JsonFiles/fetchData";

const Admin = () => {
  const navigate = useNavigate();
  const data = getStoredData()?.["1"] ?? {};

  // Check if the user is authenticated
  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated');
    if (!authenticated) {
      navigate(data.AdminAuthLink ?? '/login'); // Use AdminAuthLink for login redirection
    }
  }, [navigate, data.AdminAuthLink]);

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="Priyaadmin-panel">
      <div className="Priyacard-container">
        {data.AdminPanel?.map((panel) => (
          <div
            key={panel.PanelLink}
            className="Priyacard-box"
            onClick={() => handleRedirect(panel.PanelLink)}
          >
            <h3 className='PriyaPanelTitle'>{panel.PanelTitle}</h3>
            <p className='PriyaPanelDetails'>{panel.PanelDetails}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
