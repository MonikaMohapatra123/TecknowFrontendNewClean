import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import './Career.css'; // Import the CSS file
import { getStoredData } from "../../JsonFiles/fetchData";
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

// Lazy load components
const AllIntroTemplate = lazy(() => import('../../components/AllIntroTemplate/AllIntroTemplate'));
const AllAboutTemplate = lazy(() => import('../../components/AllAboutTemplate/AllAboutTemplate'));
const AllValues = lazy(() => import('../../components/AllValues/AllValues'));
const CareersJobs = lazy(() => import('../../components/CareersJobs/CareersJobs'));
const CareerHiring = lazy(() => import('../../components/CareerHiring/CareerHiring'));
const OfficeImages = lazy(() => import('../../components/OfficeImages/OfficeImages'));


function Career() {
  const [totalData, setTotalData] = useState(null); // State for TotalData
  const [hiringData, setHiringData] = useState([]); // State for CareerHiring data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch TotalData from getStoredData
        const storedData = getStoredData();
        if (storedData) {
          setTotalData(storedData);
        } else {
          console.error('Error: TotalData not available in local storage.');
        }

        // Fetch CareerHiring data from API
        const response = await fetch('https://technow-overseasbackend.vercel.app/hiring');
        const hiringData = await response.json();
        setHiringData(hiringData);
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
    return <div>Error: No data available.</div>;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Career Opportunities - Priya Infra",
    "url": "https://www.priyainfra.com/career",
    "description": "Explore exciting career opportunities at Priya Infra. Join a leading construction company specializing in innovative and sustainable projects.",
    "publisher": {
      "@type": "Organization",
      "name": "Priya Infra Engineers Pvt Ltd",
      "url": "https://www.priyainfra.com"
    },
    "mainEntity": {
      "@type": "JobPosting",
      "title": "Career Opportunities",
      "description": "Explore career opportunities with Priya Infra, where we offer exciting roles in a variety of construction projects. Join us to be part of a team committed to excellence and sustainability.",
      "datePosted": "2024-08-08", // Adjust the date as necessary
      "employmentType": "FULL_TIME",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Raichur",
          "addressRegion": "Karnataka",
          "addressCountry": "India"
        }
      }
    }
  };

  const companyData = totalData[0];

  return (
    <div className="about-container">
      <Helmet>
        <title>Career Opportunities - Priya Infra</title>
        <meta name="description" content="Explore exciting career opportunities at Priya Infra. Join a leading construction company specializing in innovative and sustainable projects." />
        <meta property="og:title" content="Career Opportunities - Priya Infra" />
        <meta property="og:description" content="Discover career opportunities at Priya Infra, a leading construction company focused on innovation and sustainability." />
        <meta property="og:image" content="https://www.priyainfra.com/images/services.webp" />
        <meta property="og:url" content="https://www.priyainfra.com/career" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Priya Infra Engineers Pvt Ltd" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Career Opportunities - Priya Infra" />
        <meta name="twitter:description" content="Explore career opportunities at Priya Infra and join a team dedicated to excellence and sustainability in construction." />
        <meta name="twitter:image" content="https://www.priyainfra.com/images/services.webp" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Suspense fallback={<div>Loading...</div>}>
        <AllIntroTemplate
          description={companyData.CareerDescription}
          image={companyData.Careerimage}
          title={companyData.Careertitle}
        />
        <AllAboutTemplate
          description={companyData.CareerAboutPara}
          image={companyData.CareerAboutimage}
          title={companyData.CareerAboutTitle}
          image2={companyData.CareerAboutimage2}
        />
        <OfficeImages image={companyData.OfficeImages} />
        <CareersJobs />
        <AllValues />
        <CareerHiring cards={hiringData} />
      </Suspense>
    </div>
  );
}

export default Career;
