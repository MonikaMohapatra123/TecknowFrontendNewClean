import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useLinks } from "./MyLinks"; // Import the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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

const NavLinks = ({ handleLinkClick, isScrolled }) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const { linksData, isLoading, error } = useLinks(); // Use the custom hook to fetch links data

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getColorClass = () => {
    if (window.innerWidth <= 1100) return 'text-black';
    return isScrolled ? 'text-black' : 'text-white';
  };

  return (
    <>
      {linksData.map((link) => (
        <li key={link.name}>
          <div className={`px-3 text-left md:cursor-pointer group ${isScrolled ? 'text-black' : 'text-white'}`}>
            <h1
              className={`py-7 flex justify-between items-center lg:pr-0 pr-5 group ${isScrolled ? 'text-black' : 'text-white'}`}
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              <Link to={link.link} className={`hover:text-blue-500 ${window.innerWidth <= 1100 ? 'text-black' : isScrolled ? 'text-black' : 'text-white'}`}>
                {link.name}
              </Link>
              <span className={`text-xl lg:hidden inline ${window.innerWidth <= 1100 ? 'text-black' : isScrolled ? 'text-black' : 'text-white'} transition-transform duration-300 ease-in-out`}>
                <FontAwesomeIcon
                  icon={heading === link.name ? faChevronUp : faChevronDown}
                  className={getColorClass()}
                />
              </span>
              <span className="text-xl lg:mt-1 lg:ml-2 lg:block hidden transform transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:-mt-2">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color={isScrolled ? 'black' : 'white'}
                />
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute top-33 hidden group-hover:lg:block hover:lg:block">
                  <div className="py-3">
                    <div className="w-7 h-7 left-10 absolute mt-1 bg-white rotate-45"></div>
                  </div>
                  <div className="bg-white p-5 grid grid-cols-1 gap-10 rounded-2xl">
                    {link.sublinks.slice(0, 8).map((mysublinks) => (
                      <div key={mysublinks.id}>
                        <h1 className="text-md font-semibold">
                          <Link
                            to={`${link.link}/${mysublinks.id}`}
                            className="text-black hover:text-blue-500"
                          >
                            {mysublinks.title}
                          </Link>
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menus */}
          <div className={`${heading === link.name ? "lg:hidden" : "hidden"}`}>
            {/* sublinks */}
            {link.sublinks.slice(0, 8).map((slinks) => (
              <div key={slinks.title}>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.title
                        ? setSubHeading(slinks.title)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold lg:pr-0 pr-5 flex justify-between items-center lg:pr-0 pr-5"
                  >
                    <Link to={`${link.link}/${slinks.id}`} className="text-black hover:text-blue-500" onClick={handleLinkClick}>
                      {slinks.title}
                    </Link>
                    <span className="text-xl lg:mt-1 lg:ml-2 inline"></span>
                  </h1>
                  <div className={`${subHeading === slinks.title ? "lg:hidden" : "hidden"}`}></div>
                </div>
              </div>
            ))}
          </div>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
