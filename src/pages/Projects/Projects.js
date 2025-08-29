import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import ProjectCardRow from '../../components/ProjectCardRow/ProjectCardRow';
import { getStoredData } from "../../JsonFiles/fetchData";

// Lazy load components
const AllIntroTemplateLazy = lazy(() => import('../../components/AllIntroTemplate/AllIntroTemplate'));

function Projects() {
  const [totalData, setTotalData] = useState(null); // State for TotalData
  const [projects, setProjects] = useState([]); // State for Projects
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Projects - Priya Infra",
    "url": "https://www.priyainfra.com/projects",
    "description": "Explore our diverse portfolio of projects that showcase our expertise and commitment to excellence.",
    "publisher": {
      "@type": "Organization",
      "name": "Priya Infra",
      "url": "https://www.priyainfra.com"
    }
  };

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
    return <div>Loading...</div>; // Render a loading state while fetching data
  }

  if (!totalData || !projects) {
    return <div>Error: No data available.</div>; // Render an error state if data is missing
  }

  return (
    <div className="Projects-container">
      <Helmet>
        <title>Projects - Priya Infra</title>
        <meta name="description" content="Explore our diverse portfolio of projects that showcase our expertise and commitment to excellence." />
        <meta property="og:title" content="Projects - Priya Infra" />
        <meta property="og:description" content="Explore our diverse portfolio of projects that showcase our expertise and commitment to excellence." />
        <meta property="og:url" content="https://www.priyainfra.com/projects" />
        <meta property="og:image" content="URL_TO_PROJECTS_IMAGE" /> {/* Replace with the actual image URL */}
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.priyainfra.com/projects" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <AllIntroTemplateLazy
          description={totalData[0]?.ProjectsDescription}
          image={totalData[0]?.Projectsimage}
          title={totalData[0]?.Projectstitle}
        />
        <ProjectCardRow data={projects} />
      </Suspense>
    </div>
  );
}

export default Projects;
