import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import './Services_page.css'; 
import { useParams } from 'react-router-dom';
import { getStoredData } from "../../JsonFiles/fetchData";

// Lazy load components
const AllIntroTemplate = lazy(() => import('../../components/AllIntroTemplate/AllIntroTemplate'));
const AllAboutTemplate = lazy(() => import('../../components/AllAboutTemplate/AllAboutTemplate'));
const AllHighlights = lazy(() => import('../../components/AllHighlights/AllHighlights'));
const AllProjects = lazy(() => import('../../components/AllProjects/AllProjects'));
const AllContactUs = lazy(() => import('../../components/AllContactUs/AllContactUs'));
const OfficeImages = lazy(() => import('../../components/OfficeImages/OfficeImages'));
const ServicePageCardList = lazy(() => import('../../components/ServicePageCardList/ServicePageCardList'));

function Services_page() {
  const { id } = useParams(); // Extract service ID from URL parameters
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services from API
        const servicesResponse = await fetch('https://technow-overseasbackend.vercel.app/services');
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

        // Fetch projects from API
        const projectsResponse = await fetch('https://technow-overseasbackend.vercel.app/projects');
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

        // Fetch totalData from local storage
        const storedData = getStoredData();
        setTotalData(storedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!services.length || !projects.length || !totalData) {
    return <div>Loading...</div>; // Loading state
  }

  const page = services.find(page => page.id === parseInt(id)); // Find the service by ID

  if (!page) {
    return <div>Page not found</div>; // Handle case when service is not found
  }

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Service",
    "serviceType": page.title,
    "provider": {
      "@type": "Organization",
      "name": "Priya Infra",
      "url": "https://www.priyainfra.com/"
    },
    "description": page.CardIntroDescription,
    "image": page.image,
    "url": `https://www.priyainfra.com/services/${page.id}`
  };

  return (
    <div className="about-container">
      <Helmet>
        <title>{page.title} - Priya Infra</title>
        <meta name="description" content={page.CardIntroDescription} />
        <meta property="og:title" content={`${page.title} - Priya Infra`} />
        <meta property="og:description" content={page.CardIntroDescription} />
        <meta property="og:image" content={page.image} />
        <meta property="og:url" content={`https://www.priyainfra.com/services/${page.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Priya Infra" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${page.title} - Priya Infra`} />
        <meta property="twitter:description" content={page.CardIntroDescription} />
        <meta property="twitter:image" content={page.image} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <AllIntroTemplate 
          description={page.CardIntroDescription} 
          image={page.image} 
          title={page.title} 
        />
        <AllAboutTemplate 
          description={page.CardIntroAboutPara} 
          image={page.CardIntroAboutimage} 
          title={page.CardIntroAboutTitle} 
          image2={page.CardIntroAboutimage2}
        />
        <OfficeImages image={page.photo} />
        <ServicePageCardList data={page} projects={projects}/>
        <AllHighlights data={totalData.map(data => data.highlights)} />
        <AllProjects cards={projects} />
        <AllContactUs data={totalData} />
      </Suspense>
    </div>
  );
}

export default Services_page;
