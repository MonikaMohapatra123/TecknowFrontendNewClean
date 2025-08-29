import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './WhyPriya.css'; // Import the CSS file
import AllAboutTemplate from '../../components/AllAboutTemplate/AllAboutTemplate';
import AllIntroTemplate from '../../components/AllIntroTemplate/AllIntroTemplate';
import WhyScrollEffect from '../../components/WhyScrollEffect/WhyScrollEffect';
import AllValues from '../../components/AllValues/AllValues';
import AllSustainability from '../../components/AllSustainability/AllSustainability';
import AllProjects from '../../components/AllProjects/AllProjects';
import AllContactUs from '../../components/AllContactUs/AllContactUs';
import CompanyPdfViewer from '../../components/CompanyPdfViewer/CompanyPdfViewer';
import { getStoredData } from "../../JsonFiles/fetchData";
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

function WhyPriya() {
  const [totalData, setTotalData] = useState(null); // State for TotalData
  const [projects, setProjects] = useState([]); // State for projects fetched from API
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch and set TotalData from local storage
        const storedData = getStoredData();
        if (storedData) {
          setTotalData(storedData);
        }

        // Fetch projects from the backend API
        const projectsResponse = await fetch('https://technow-overseasbackend.vercel.app/projects');
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
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

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Why Priya - Priya Infra",
    "url": "https://www.priyainfra.com/why-priya",
    "description": "Discover why choosing Priya Infra is the right decision for your projects. Our expertise and commitment to quality set us apart.",
    "publisher": {
      "@type": "Organization",
      "name": "Priya Infra",
      "url": "https://www.priyainfra.com"
    }
  };

  return (
    <div className="about-container">
      <Helmet>
        <title>Why Priya - Priya Infra</title>
        <meta
          name="description"
          content="Discover why choosing Priya Infra is the right decision for your projects. Our expertise and commitment to quality set us apart."
        />
        <meta property="og:title" content="Why Priya - Priya Infra" />
        <meta
          property="og:description"
          content="Discover why choosing Priya Infra is the right decision for your projects. Our expertise and commitment to quality set us apart."
        />
        <meta property="og:url" content="https://www.priyainfra.com/why-priya" />
        <meta property="og:image" content="URL_to_representative_image" /> {/* Replace with actual image URL */}
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="Priya Infra, construction services, infrastructure development, civil engineering"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.priyainfra.com/why-priya" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <AllIntroTemplate
        description={totalData[0]?.WhyUSDescription}
        image={totalData[0]?.WhyUSimage}
        title={totalData[0]?.WhyUStitle}
      />
      <AllAboutTemplate
        description={totalData[0]?.WhyUSAboutPara}
        image={totalData[0]?.WhyUSAboutimage}
        title={totalData[0]?.WhyUSAboutTitle}
        image2={totalData[0]?.WhyUSAboutimage2}
      />
      <WhyScrollEffect data={totalData} />
      <CompanyPdfViewer data={totalData[0]?.PdfCompany} />
      <AllValues />
      <AllSustainability data={totalData} />
      <AllProjects cards={projects} />
      <AllContactUs data={totalData} />
    </div>
  );
}

export default WhyPriya;
