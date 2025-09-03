import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import './Contact.css'; // Import the CSS file
import { getStoredData } from "../../JsonFiles/fetchData";
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import ContactCards from '../../components/ContactCards/ContactCards';

// Lazy load components
const AllIntroTemplate = lazy(() => import('../../components/AllIntroTemplate/AllIntroTemplate'));
const ContactMap = lazy(() => import('../../components/ContactMap/ContactMap'));

function Contact() {
  const [totalData, setTotalData] = useState(null); // State for TotalData
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch TotalData from getStoredData
        const storedData = getStoredData();
        if (storedData) {
          setTotalData(storedData);
        } else {
          console.error('Error: No TotalData found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingIcon />; // Show the loading icon component while fetching data
  }

  if (!totalData) {
    return <div>Error: Data not available.</div>;
  }

  const companyData = totalData[0]; // Assuming the first item contains relevant contact details

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Priya Infra",
    "url": "http://localhost:3000/contact",
    "description": "Get in touch with Priya Infra. Find our contact details, location, and send us your queries.",
    "publisher": {
      "@type": "Organization",
      "name": "Priya Infra",
      "url": "https://innotechconsultant.co.in/"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-1234",
      "contactType": "Customer Service"
    }
  };

  return (
    <div className="Contact-container">
      <Helmet>
        <title>Contact - Priya Infra</title>
        <meta name="description" content="Get in touch with Priya Infra. Find our contact details, location, and send us your queries." />
        <meta property="og:title" content="Contact - Priya Infra" />
        <meta property="og:description" content="Get in touch with Priya Infra. Find our contact details, location, and send us your queries." />
        <meta property="og:image" content="/images/contact.webp" />
        <meta property="og:url" content="https://innotechconsultant.co.in/contact" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
     
        <AllIntroTemplate
          description={companyData.ContactusDescription}
          image={companyData.Contactusimage}
          title={companyData.Contactustitle}
        />
         <ContactCards/>
        <ContactMap data={companyData.ContactMap} />
       
      </Suspense>
    </div>
  );
}

export default Contact;
