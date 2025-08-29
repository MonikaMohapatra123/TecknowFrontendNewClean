import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './ContactMap.css';

const customMarkerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const ContactMap = ({ data }) => {
  const office = data[0];
  const defaultCenter = {
    lat: parseFloat(office.ContactOfficeLat),
    lng: parseFloat(office.ContactOfficeLong),
  };

  return (
    <div className="contact-section">
      {/* Left side map */}
      <div className="map-wrapper">
        <MapContainer center={[defaultCenter.lat, defaultCenter.lng]} zoom={13} className="leaflet-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[defaultCenter.lat, defaultCenter.lng]} icon={customMarkerIcon}>
            <Popup>{office.ContactOffice}</Popup>
          </Marker>
        </MapContainer>

        <div className="address-card">
          <div className="icon">📍</div>
          <h3>Head Office Address</h3>
          <p>{office.ContactOfficeAddress}</p>
          <p>{office.ContactOfficeCity}</p>
          <p>{office.ContactOfficePhone}</p>
        </div>
      </div>

      {/* Right side contact form */}
      <div className="form-wrapper">
        <h2>Get In Touch With Us</h2>
        <p>
          Whether you’re looking for expert advice, seeking solutions, or simply want to explore how our
          services can benefit your project, don’t hesitate to reach out.
        </p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <div className="form-row">
            <input type="email" placeholder="Email Address" />
            <input type="tel" placeholder="Phone Number" />
          </div>
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>

        <p className="compliance">
          BEC complies with the Personal Data Protection Act 2012 (PDPA) of Singapore.
        </p>
      </div>
    </div>
  );
};

export default ContactMap;
