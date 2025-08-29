import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import './AreaOfActivities.css'; // Import the CSS file

import { getStoredData } from "../../JsonFiles/fetchData";
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

const AllIntroTemplate = lazy(() => import('../../components/AllIntroTemplate/AllIntroTemplate'));
const AllProjects = lazy(() => import('../../components/AllProjects/AllProjects'));
const ServicesCardList = lazy(() => import('../../components/ServicesCardList/ServicesCardList'));

function AreaOfActivities() {
  const [totalData, setTotalData] = useState(null); // State for TotalData
  const [services, setServices] = useState([]); // State for services fetched from API
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

        // Fetch services from the backend API
        const servicesResponse = await fetch('https://technow-overseasbackend.vercel.app/services');
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

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
    "name": "Area of Activities - Priya Infra",
    "url": "https://www.priyainfra.com/area-of-activities",
    "description": "Learn about the various services and projects offered by Priya Infra.",
    "publisher": {
      "@type": "Organization",
      "name": "Priya Infra",
      "url": "https://www.priyainfra.com"
    }
  };

  const servicesStructuredData = services.map(service => ({
    "@context": "http://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "Organization",
      "name": "Priya Infra",
      "url": "https://www.priyainfra.com"
    }
  }));

  const projectsStructuredData = projects.map(project => ({
    "@context": "http://schema.org",
    "@type": "Project",
    "name": project.title,
    "url": `https://www.priyainfra.com/projects/${project.id}`,
    "description": project.description,
    "image": project.image
  }));

  const allStructuredData = {
    "@context": "http://schema.org",
    "@graph": [
      structuredData,
      ...servicesStructuredData,
      ...projectsStructuredData
    ]
  };

  return (
    <div className="AreaOfActivites-container">
      <Helmet>
        <title>Area of Activities - Priya Infra</title>
        <meta name="description" content="Learn about the various services and projects offered by Priya Infra." />
        <meta property="og:title" content="Area of Activities - Priya Infra" />
        <meta property="og:description" content="Discover the range of services and projects by Priya Infra." />
        <meta property="og:image" content="https://www.priyainfra.com/images/services.webp" />
        <meta property="og:url" content="https://www.priyainfra.com/area-of-activities" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Area of Activities - Priya Infra" />
        <meta name="twitter:description" content="Discover the range of services and projects by Priya Infra." />
        <meta name="twitter:image" content="https://www.priyainfra.com/images/services.webp" />
        <meta name="twitter:url" content="https://www.priyainfra.com/area-of-activities" />
        <script type="application/ld+json">
          {JSON.stringify(allStructuredData)}
        </script>
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <AllIntroTemplate
          description={totalData[0]?.ServicesDescription}
          image={totalData[0]?.Servicesimage}
          title={totalData[0]?.Servicestitle}
        />
        <ServicesCardList data={services} projects={projects} />
        <AllProjects cards={projects} />
      </Suspense>
    </div>
  );
}

export default AreaOfActivities;
