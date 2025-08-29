import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import './Project_page.css';
import { useParams } from 'react-router-dom';
import { getStoredData } from '../../JsonFiles/fetchData';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

// Lazy load components
const AllIntroTemplate = lazy(() => import('../../components/AllIntroTemplate/AllIntroTemplate'));
const AllAboutTemplate = lazy(() => import('../../components/AllAboutTemplate/AllAboutTemplate'));
const OfficeImages = lazy(() => import('../../components/OfficeImages/OfficeImages'));
const AllProjects = lazy(() => import('../../components/AllProjects/AllProjects'));
const AllContactUs = lazy(() => import('../../components/AllContactUs/AllContactUs'));

function Project_page() {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(null); // Single project data
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch project data from API
        const response = await fetch('https://technow-overseasbackend.vercel.app/projects');
        const projectsData = await response.json();
        setProjects(projectsData);

        // Find the specific project by ID
        const project = projectsData.find((project) => project.id === parseInt(id));
        setPage(project);
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [id]);

  if (isLoading) {
    return <LoadingIcon />; // Show the loading icon component while fetching data
  }

  if (!page) {
    return <div>Page not found</div>;
  }

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": `Project - ${page.title}`,
    "url": `https://www.priyainfra.com/projects/${page.id}`,
    "description": page.ProjectsDescription,
    "image": page.Projectsimage,
    "publisher": {
      "@type": "Organization",
      "name": "Priya Infra",
      "url": "https://www.priyainfra.com/"
    }
  };

  return (
    <div className="ProjectsPage-container">
      <Helmet>
        <title>{page.title} - Priya Infra</title>
        <meta name="description" content={page.ProjectsDescription} />
        <meta name="keywords" content={`Priya Infra, ${page.title}, construction, project`} />
        <meta name="author" content="Priya Infra Engineers Pvt Ltd" />
        <meta property="og:title" content={`${page.title} - Priya Infra`} />
        <meta property="og:description" content={page.ProjectsDescription} />
        <meta property="og:image" content={page.Projectsimage} />
        <meta property="og:url" content={`https://www.priyainfra.com/projects/${page.id}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://www.priyainfra.com/projects/${page.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <AllIntroTemplate 
          description={page.ProjectsDescription} 
          image={page.image} 
          title={page.title} 
        />
        <AllAboutTemplate 
          description={page.ProjectsAboutPara} 
          image={page.ProjectsAboutimage} 
          title={page.ProjectsAboutTitle} 
          image2={page.ProjectsAboutimage2}
        />
        <OfficeImages image={page.photo} />
        <AllProjects cards={projects} />
        <AllContactUs data={getStoredData()} />
      </Suspense>
    </div>
  );
}

export default Project_page;
