import React, { useEffect, useState } from 'react';
import './CareersJobs.css';
import emailjs from 'emailjs-com';
import { getStoredData } from "../../JsonFiles/fetchData";

function CareersJobs() {
  const [totalData, setTotalData] = useState(null); // State for dynamic data

  useEffect(() => {
    // Fetch stored data and set the state
    const storedData = getStoredData();
    if (storedData) {
      setTotalData(storedData[0]); // Assuming relevant data is in the first object
    }
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = e.target.elements;

    // Validate phone number
    if (!/^\d{10}$/.test(phone.value)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Prepare form data for the API
    const formData = {
      name: name.value,
      email: email.value,
      country: "India", // Assuming country is fixed; you can add a field for dynamic input
      countryCode: "+91",
      phone: phone.value,
      message: message.value || "No additional message provided.",
    };

    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        'service_ystlmqj',
        'template_pwxep1n',
        e.target,
        'efnQ_-lOOJQ0YcFtY'
      );
      alert("Email sent successfully!");

      // Submit form data to the backend API
      const response = await fetch("https://technow-overseasbackend.vercel.app/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data to the server");
      }

      alert("Form submitted successfully!");
      e.target.reset(); // Clear the form fields
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  if (!totalData) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  return (
    <div className='Careers_jobs-container'>
      <div className='Careers_jobs-contain'>
        <h1 className="Careers_jobs-title">Get In Touch</h1>

        <form onSubmit={sendEmail}>
          <div className="Careers_jobs-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              pattern="[a-zA-Z ]+"
              title="Please enter a valid name (letters only)"
            />
          </div>
          <div className="Careers_jobs-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address (e.g. user@example.com)"
            />
          </div>
          <div className="Careers_jobs-group">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone / Whatsapp"
              required
              pattern="^\d{10}$"
              title="Please enter exactly 10 digits"
            />
          </div>
          <div className="Careers_jobs-group">
            <textarea
              id="message"
              name="message"
              placeholder="Message (optional)"
              rows="3"
            />
          </div>

          <p className="Careers_jobs-privacy">
            By submitting, I agree to Priya Infra's Privacy Policy.
          </p>

          <div className="btnget-container">
            <button type="submit" className="btn-Careers_jobs">LET'S TALK</button>
          </div>
        </form>
      </div>

      <div className="careercontainer-card">
        <h3>
          If you need any info please contact <span className="us-highlight">us!</span>
        </h3>
        <p className="heading-jobs">Head office address:</p>
        <a href={totalData.Location1} target="_blank" rel="noopener noreferrer">
          <p className="Para-jobs">{totalData.Address1}</p>
        </a>
        <p className="heading-jobs">Email: </p>
        <a href={`mailto:${totalData.Email}`}>
          <p className="Para-jobs">{totalData.Email}</p>
        </a>
        <p className="heading-jobs">Call for help: </p>
        <p className="Para-jobs">+91 9594117963</p>

        <div className="careercall-now-button">
          <a href="https://wa.me/+919594117963/?text=Hi" target="_blank" rel="noopener noreferrer">
            <button className="careercall-btn">Contact Now</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CareersJobs;
