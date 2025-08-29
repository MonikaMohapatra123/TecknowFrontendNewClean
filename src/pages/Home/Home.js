import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import './Home.css';

import { getStoredData } from "../../JsonFiles/fetchData";
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Accordion from '../../components/Accordion/Accordion';

const HomeIntroduction = lazy(() => import('../../components/HomeIntroduction/HomeIntroduction'));
const AllHighlights = lazy(() => import('../../components/AllHighlights/AllHighlights'));
const AllProjects = lazy(() => import('../../components/AllProjects/AllProjects'));
const AllContactUs = lazy(() => import('../../components/AllContactUs/AllContactUs'));
const HomeIconSlider = lazy(() => import('../../components/HomeIconSlider/HomeIconSlider'));
const HomeAboutUs = lazy(() => import('../../components/HomeAboutUs/HomeAboutUs'));

function Home() {
  const [totalData, setTotalData] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = getStoredData();
        if (storedData) setTotalData(storedData);

        // Fetch services
        const servicesResponse = await fetch('https://technow-overseasbackend.vercel.app/services');
        const servicesData = await servicesResponse.json();
        setServices(Array.isArray(servicesData) ? servicesData : []);

        // Fetch projects
        const projectsResponse = await fetch('https://technow-overseasbackend.vercel.app/projects');
        const projectsData = await projectsResponse.json();
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingIcon />;
  if (!totalData) return <div>Error: No data available.</div>;

  const highlightsData = totalData.map((data) => data.highlights);

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "Priya Infra",
    "url": "https://www.priyainfra.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.priyainfra.com/search?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const servicesStructuredData = Array.isArray(services)
    ? services.map((service) => ({
        "@context": "http://schema.org",
        "@type": "Service",
        "serviceType": service.title,
        "provider": {
          "@type": "Organization",
          "name": "Priya Infra",
          "url": "https://www.priyainfra.com/"
        }
      }))
    : [];

  const projectsStructuredData = Array.isArray(projects)
    ? projects.map((project) => ({
        "@context": "http://schema.org",
        "@type": "Project",
        "name": project.title,
        "url": `https://www.priyainfra.com/projects/${project.id}`,
        "description": project.description,
        "image": project.image
      }))
    : [];

  const allStructuredData = [...servicesStructuredData, ...projectsStructuredData];

  return (
    <div className="home-container">
      <Helmet>
        <title>Home Page - Tecknow Engineers Pvt Ltd</title>
        <meta
          name="description"
          content="Welcome to Priya Infra Engineers Pvt Ltd. Discover our high-quality construction services, innovative projects, and commitment to sustainability."
        />
        <meta property="og:title" content="Home Page - Priya Infra Engineers Pvt Ltd" />
        <meta
          property="og:description"
          content="Explore Priya Infra's expertise in construction and infrastructure. Learn about our services, projects, and sustainability efforts."
        />
        <meta property="og:image" content="https://www.priyainfra.com/images/logo.webp" />
        <meta property="og:url" content="https://www.priyainfra.com/" />
        <link rel="canonical" href="https://www.priyainfra.com/" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(allStructuredData)}</script>
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeIntroduction />
        <HomeAboutUs data={totalData[0]} />
        <AllHighlights data={highlightsData} />
        <Accordion />
        <AllProjects cards={projects} />
        <AllContactUs data={totalData} />
        <HomeIconSlider />
      </Suspense>
    </div>
  );
}

export default Home;
