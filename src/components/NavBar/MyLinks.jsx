import { useEffect, useState } from "react";

// Custom Hook to fetch and return links data
export const useLinks = () => {
  const [linksData, setLinksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Optional: to manage loading state
  const [error, setError] = useState(null); // Optional: to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services data
        const servicesResponse = await fetch("https://technow-overseasbackend.vercel.app/services");
        const services = await servicesResponse.json();

        // Fetch projects data
        const projectsResponse = await fetch("https://technow-overseasbackend.vercel.app/projects");
        const projects = await projectsResponse.json();

        // Structure the links data
        const linksStructure = [
          {
            name: "Area of Activities",
            submenu: true,
            link: "/services",
            sublinks: services.map((item) => ({
              title: item.title,
              id: item.id,
            })),
          },
          {
            name: "Projects",
            submenu: true,
            link: "/projects",
            sublinks: projects.map((item) => ({
              title: item.title,
              id: item.id,
            })),
          },
        ];

        setLinksData(linksStructure);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err); // Update error state
      } finally {
        setIsLoading(false); // Loading complete
      }
    };

    fetchData();
  }, []);

  return { linksData, isLoading, error }; // Return data, loading state, and error
};
