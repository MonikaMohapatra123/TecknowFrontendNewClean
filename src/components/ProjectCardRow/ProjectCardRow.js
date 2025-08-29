import React, { useState, useMemo, useCallback } from 'react';
import './ProjectCardRow.css'; // Import the CSS file
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, children, ...rest }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <RouterLink to={to} onClick={handleClick} {...rest}>
      {children}
    </RouterLink>
  );
};

function ProjectCardRow({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const projectsPerPage = 12;

  // Function to handle search input change
  const handleSearchInputChange = useCallback(event => {
    const query = event.target.value;
    setSearchQuery(query);
  }, []);

  // Function to filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(project =>
      Object.values(project).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  // Logic to get projects for the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = useMemo(() => filteredProjects.slice(indexOfFirstProject, indexOfLastProject), [filteredProjects, indexOfFirstProject, indexOfLastProject]);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="case-studies-heading">
        <div className="HeaderProjectCase">
          <h4>All the case studies</h4>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966" className="search-icon" aria-label="Search Icon">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="card-deck">
        {currentProjects.map(page => (
          <ProjectCard key={page.id} project={page} />
        ))}
      </div>
      <Pagination
        projectsPerPage={projectsPerPage}
        totalProjects={filteredProjects.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

const ProjectCard = React.memo(({ project }) => {
  return (
    <div className="card-project">
      <Link to={`/projects/${project.id}`}>
        <div className="card-body">
          <img src={project.image} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" className="project-image" />
          <p className="industry">{project.client}</p>
          <h1 className="card-title">{project.title}</h1>
          <p className="card-text">{project.description}</p>
        </div>
      </Link>
    </div>
  );
});

function Pagination({ projectsPerPage, totalProjects, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to handle pagination click and scroll to top
  const handlePaginationClick = pageNumber => {
    paginate(pageNumber); // Change page
    setTimeout(() => window.scrollTo(0, 0), 0); // Scroll to top asynchronously
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => handlePaginationClick(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ProjectCardRow;
