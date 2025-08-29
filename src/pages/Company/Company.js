import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import './Company.css'; // Import the CSS file
import { getStoredData } from "../../JsonFiles/fetchData";
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

// Lazy load components
const AllIntroTemplate = lazy(() => import('../../components/AllIntroTemplate/AllIntroTemplate'));
const AllAboutTemplate = lazy(() => import('../../components/AllAboutTemplate/AllAboutTemplate'));
const AllHighlights = lazy(() => import('../../components/AllHighlights/AllHighlights'));
const AllSustainability = lazy(() => import('../../components/AllSustainability/AllSustainability'));
const AllValues = lazy(() => import('../../components/AllValues/AllValues'));
const CompanyQuotes = lazy(() => import('../../components/CompanyQuotes/CompanyQuotes'));
const PhotoSlider = lazy(() => import('../../components/CompanyTimeline/CompanyTimelineGrid'));
const CompanyDirectors = lazy(() => import('../../components/CompanyDirectors/CompanyDirectors'));
const HomeServicesCatelogs = lazy(() => import('../../components/HomeServicesCatelogs/HomeServicesCatelogs'));
const AllMapOffice = lazy(() => import('../../components/AllMapOffice/AllMapOffice'));
const CompanyPdfViewer = lazy(() => import('../../components/CompanyPdfViewer/CompanyPdfViewer'));

function Company() {
  const [totalData, setTotalData] = useState(null); // State for TotalData
  const [services, setServices] = useState([]); // State for services
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch and set TotalData from local storage
        const storedData = getStoredData();
        if (storedData) {
          setTotalData(storedData);
        }

        // Fetch services from the backend API
        const servicesResponse = await fetch('https://technow-overseasbackend.vercel.app/services');
        const servicesData = await servicesResponse.json();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after all fetches
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

  const companyData = totalData[0];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Priya Infra Engineers Pvt Ltd",
    "url": "https://www.priyainfra.com/company",
    "logo": companyData.Companyimage,
    "description": companyData.CompanyDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Raichur",
      "addressRegion": "Karnataka",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+91 9594117963",
      "email": companyData.Email
    },
    "sameAs": [
      "https://www.facebook.com/priyainfra",
      "https://www.linkedin.com/company/priyainfra"
    ]
  };

  return (
    <div className="Company-container">
      <Helmet>
        <title>Company - Priya Infra Engineers Pvt Ltd | Leading Construction & Engineering Services</title>
        <meta name="description" content={companyData.CompanyDescription} />
        <meta property="og:title" content="Company - Priya Infra Engineers Pvt Ltd" />
        <meta property="og:description" content={companyData.CompanyDescription} />
        <meta property="og:image" content={companyData.Companyimage} />
        <meta property="og:url" content="https://www.priyainfra.com/company" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Company - Priya Infra Engineers Pvt Ltd" />
        <meta name="twitter:description" content={companyData.CompanyDescription} />
        <meta name="twitter:image" content={companyData.Companyimage} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Suspense fallback={<div>Loading...</div>}>
        <AllIntroTemplate
          description={companyData.CompanyDescription}
          image={companyData.Companyimage}
          title={companyData.Companytitle}
        />
        <AllAboutTemplate
          description={companyData.CompanyAboutPara}
          image={companyData.CompanyAboutimage}
          title={companyData.CompanyAboutTitle}
          image2={companyData.CompanyAboutimage2}
        />
        <HomeServicesCatelogs data={services} details={totalData[0]} />
        <AllHighlights data={totalData.map(data => data.highlights)} />
        <PhotoSlider cards={companyData.Timeline} />
        <CompanyPdfViewer data={companyData.PdfCompany} />
        <AllSustainability data={totalData} />
        <CompanyQuotes data={companyData} />
        <AllMapOffice data={companyData.MapCity} title={companyData.HeadingMap} />
        <AllValues />
        <CompanyDirectors cards={totalData} />
      </Suspense>
    </div>
  );
}

export default Company;
